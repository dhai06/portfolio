'use client';

import { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import React from 'react';
import PhotoBlock from './PhotoBlock';
import PromptBlock from './PromptBlock';
import InfoPillsBlock from './InfoPillsBlock';
import Menu from './Menu';
import AboutIntroBlock from './AboutIntroBlock';
import PairedBlock from './PairedBlock';
import SummaryBlock from './SummaryBlock';
import ItemDetailsModal from './ItemDetailsModal';
import BreadcrumbPill from './BreadcrumbPill';
import { CardData, ImageItem, PromptData } from '@/data/portfolioData';
import { isPairedBlock, isImageItem, isPromptItem } from '@/data/types';
import { BlockVisibleProvider } from './BlockVisibleContext';
import { slideVariants, scrollBlockAnimation } from '@/lib/animations';
import { TIMING, SPRING, DELAYS } from '@/lib/constants';

interface ProfileFeedProps {
    profiles: CardData[];
}

// Scroll-triggered animation block component with index-based stagger and exit support
interface ScrollAnimationBlockProps {
    children: React.ReactNode;
    index: number;
    totalBlocks: number;
    mountTime: number;
    isExiting: boolean;
    onExitComplete?: () => void;
    /** Block type for content-visibility CSS optimization */
    blockType?: 'paired' | 'image' | 'prompt' | 'pills';
}

// Stable animation targets to prevent re-renders from restarting animations
const exitAnimation = { opacity: 0, y: -30, scale: 0.95 };

function ScrollAnimationBlock({ 
    children, 
    index, 
    totalBlocks,
    mountTime, 
    isExiting,
    onExitComplete,
    blockType = 'prompt'
}: ScrollAnimationBlockProps) {
    // Determine CSS class for content-visibility optimization
    // First 2 blocks are priority (above the fold), rest use auto content-visibility
    const isPriority = index < 2;
    const blockClass = isPriority 
        ? 'feed-block-priority' 
        : blockType === 'paired' 
            ? 'feed-block-paired' 
            : blockType === 'prompt' 
                ? 'feed-block-prompt' 
                : 'feed-block';
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [animationState, setAnimationState] = useState<'hidden' | 'visible' | 'exiting'>('hidden');
    const [delay, setDelay] = useState(0);
    const hasTriggeredEntry = useRef(false);

    // When block enters viewport, trigger entry animation
    useLayoutEffect(() => {
        if (isInView && !hasTriggeredEntry.current && !isExiting) {
            const now = Date.now();
            const timeSinceMount = now - mountTime;

            // If entering viewport within threshold of mount, use index-based stagger
            const calculatedDelay = timeSinceMount < TIMING.STAGGER_THRESHOLD
                ? index * DELAYS.STAGGER
                : 0;

            setDelay(calculatedDelay);
            hasTriggeredEntry.current = true;
            setAnimationState('visible');
        }
    }, [isInView, index, mountTime, isExiting]);

    // Handle exit state - use layout effect to prevent flash
    useLayoutEffect(() => {
        if (isExiting && animationState === 'visible') {
            setAnimationState('exiting');
        }
    }, [isExiting, animationState]);

    // Calculate exit delay (reverse order - last items exit first)
    const exitDelay = (totalBlocks - 1 - index) * 0.05;

    // Determine animation target based on state
    const animateTarget = animationState === 'exiting' 
        ? exitAnimation
        : animationState === 'visible'
            ? scrollBlockAnimation.animate
            : scrollBlockAnimation.hidden;

    // Memoize transition to prevent unnecessary recreations
    const transition = useMemo(() => 
        animationState === 'exiting'
            ? { delay: exitDelay, duration: 0.2, ease: 'easeIn' as const }
            : { delay, ...SPRING.DEFAULT },
        [animationState, exitDelay, delay]
    );

    return (
        <motion.div
            ref={ref}
            className={blockClass}
            style={{ willChange: 'transform, opacity' }}
            initial={scrollBlockAnimation.initial}
            animate={animateTarget}
            transition={transition}
            onAnimationComplete={() => {
                if (animationState === 'exiting' && index === 0 && onExitComplete) {
                    onExitComplete();
                }
            }}
        >
            <BlockVisibleProvider isVisible={animationState === 'visible' || animationState === 'exiting'}>
                {children}
            </BlockVisibleProvider>
        </motion.div>
    );
}

export default function ProfileFeed({ profiles }: ProfileFeedProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isInitialMount, setIsInitialMount] = useState(true);
    const [likedItems, setLikedItems] = useState<Map<string, string>>(new Map());
    const [selectedItem, setSelectedItem] = useState<ImageItem | PromptData | null>(null);
    const [isExiting, setIsExiting] = useState(false);
    const [pendingNavigation, setPendingNavigation] = useState<{ index: number; direction: number } | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentProfile = profiles[currentIndex];

    // Track mount time for stagger calculation - resets when profile changes
    const [mountTime, setMountTime] = useState(Date.now());

    // Reset mount time when profile changes
    useEffect(() => {
        setMountTime(Date.now());
    }, [currentIndex]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    // Handle exit animation completion
    const handleExitComplete = useCallback(() => {
        if (pendingNavigation) {
            scrollToTop();
            setDirection(pendingNavigation.direction);
            setCurrentIndex(pendingNavigation.index);
            setPendingNavigation(null);
            setIsExiting(false);
        }
    }, [pendingNavigation]);

    const triggerNavigation = useCallback((newIndex: number, newDirection: number) => {
        if (isExiting) return; // Prevent double navigation
        setIsInitialMount(false);
        setIsExiting(true);
        setPendingNavigation({ index: newIndex, direction: newDirection });
    }, [isExiting]);

    // Safety timeout in case exit animation doesn't complete
    useEffect(() => {
        if (isExiting && pendingNavigation) {
            const timeout = setTimeout(() => {
                scrollToTop();
                setDirection(pendingNavigation.direction);
                setCurrentIndex(pendingNavigation.index);
                setPendingNavigation(null);
                setIsExiting(false);
            }, 600); // Max wait time for exit animation
            return () => clearTimeout(timeout);
        }
    }, [isExiting, pendingNavigation]);

    const handleNext = () => {
        const newIndex = (currentIndex + 1) % profiles.length;
        triggerNavigation(newIndex, 1);
    };

    const handlePrevious = () => {
        const newIndex = (currentIndex - 1 + profiles.length) % profiles.length;
        triggerNavigation(newIndex, -1);
    };

    // Stable toggle like handler - uses functional setState to avoid likedItems dependency
    const toggleLike = useCallback((id: string, summary: string) => {
        setLikedItems((prev) => {
            const next = new Map(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.set(id, summary);
            }
            return next;
        });
    }, []);

    // Stable heart click handler
    const handleHeartClick = useCallback((item: ImageItem | PromptData, id: string, summary: string) => {
        setLikedItems((prev) => {
            const isCurrentlyLiked = prev.has(id);
            const next = new Map(prev);
            if (isCurrentlyLiked) {
                next.delete(id);
            } else {
                next.set(id, summary);
                // Open modal only when liking (not unliking)
                setSelectedItem(item);
            }
            return next;
        });
    }, []);

    // Stable block click handler
    const handleBlockClick = useCallback((item: ImageItem | PromptData) => {
        setSelectedItem(item);
    }, []);

    // Type for block with metadata for content-visibility optimization
    type BlockWithType = {
        content: React.ReactNode;
        type: 'paired' | 'image' | 'prompt' | 'pills';
    };

    // Memoize blocks to prevent recreation on every render
    // Only recompute when profile or liked items change
    const renderedBlocks = useMemo((): BlockWithType[] => {
        const blocks: BlockWithType[] = [];

        currentProfile.blocks.forEach((block, index) => {
            if (isPairedBlock(block)) {
                // Create a synthetic item for the modal that combines paired block data
                const pairedItem: ImageItem = {
                    kind: 'image',
                    id: block.id,
                    src: block.image.src,
                    likeSummary: block.likeSummary,
                    details: block.details,
                };

                // For about page's first paired block, use the special AboutIntroBlock
                if (currentProfile.type === 'about' && index === 0 && block.prompt.contentType === 'intro') {
                    blocks.push({
                        content: (
                            <AboutIntroBlock
                                key={`paired-about-${index}`}
                                imageSrc={block.image.src}
                                imageAlt={currentProfile.name}
                                isLiked={likedItems.has(block.id)}
                                onHeartClick={() => handleHeartClick(pairedItem, block.id, block.likeSummary)}
                                onBlockClick={() => handleBlockClick(pairedItem)}
                            />
                        ),
                        type: 'paired',
                    });
                } else {
                    // Regular paired block with alternating layout - both parts share the same ID
                    blocks.push({
                        content: (
                            <PairedBlock
                                key={`paired-${index}`}
                                block={block}
                                isLiked={likedItems.has(block.id)}
                                onHeartClick={() => handleHeartClick(pairedItem, block.id, block.likeSummary)}
                                onBlockClick={() => handleBlockClick(pairedItem)}
                                index={index}
                            />
                        ),
                        type: 'paired',
                    });
                }
            } else if (isImageItem(block)) {
                // Standalone image - pass index for smart loading priority
                blocks.push({
                    content: (
                        <PhotoBlock
                            key={`img-${index}`}
                            src={block.src}
                            alt={currentProfile.name}
                            isLiked={likedItems.has(block.id)}
                            onHeartClick={() => handleHeartClick(block, block.id, block.likeSummary)}
                            onBlockClick={() => handleBlockClick(block)}
                            index={index}
                        />
                    ),
                    type: 'image',
                });
            } else if (isPromptItem(block)) {
                // Standalone prompt
                const promptId = block.id || `prompt-${index}`;
                const promptSummary = block.likeSummary || block.answer;
                blocks.push({
                    content: (
                        <PromptBlock
                            key={`prompt-${index}`}
                            prompt={block}
                            isLiked={likedItems.has(promptId)}
                            onHeartClick={() => handleHeartClick(block, promptId, promptSummary)}
                            onBlockClick={() => handleBlockClick(block)}
                        />
                    ),
                    type: 'prompt',
                });
            }
        });

        // Append SummaryBlock on contact page
        if (currentProfile.type === 'contact') {
            blocks.push({
                content: <SummaryBlock key="summary" likedSummaries={[...likedItems.values()]} />,
                type: 'prompt',
            });
        }

        return blocks;
    }, [currentProfile, likedItems, handleHeartClick, handleBlockClick]);

    return (
        <div className="min-h-screen bg-[var(--background)]">
            {/* Sticky Header */}
            <header className="sticky top-0 z-50">
                <div className="bg-[var(--background)] px-4 py-3 flex items-center justify-between">
                    <BreadcrumbPill
                        prefix="dhai"
                        section={
                            currentProfile.type === 'about'
                                ? 'about'
                                : currentProfile.type === 'contact'
                                    ? 'contact'
                                    : currentProfile.name.toLowerCase()
                        }
                    />
                    <Menu
                        profiles={profiles}
                        currentIndex={currentIndex}
                        onSelect={(index) => {
                            const newDirection = index > currentIndex ? 1 : -1;
                            triggerNavigation(index, newDirection);
                        }}
                        onMenuStateChange={setIsMenuOpen}
                    />
                </div>
                {/* Blur gradient fade */}
                <div 
                    className="h-6 pointer-events-none"
                    style={{
                        background: 'linear-gradient(to bottom, var(--background) 0%, transparent 100%)',
                    }}
                />
            </header>

            {/* Scrollable Content with Slide Animation */}
            <AnimatePresence mode="popLayout" custom={direction}>
                <motion.main
                    key={currentProfile.id}
                    custom={direction}
                    variants={slideVariants}
                    initial={isInitialMount ? { opacity: 1, x: 0 } : 'enter'}
                    animate="center"
                    exit="exit"
                    transition={{
                        x: SPRING.SLIDE,
                        opacity: { duration: 0.2 },
                    }}
                    className="pb-24 px-4 py-4"
                >
                    {/* Blocks animate with stagger effect when entering viewport */}
                    <div className="space-y-4">
                        {(() => {
                            const totalBlocks = renderedBlocks.length + (currentProfile.infoPills?.length ? 1 : 0);
                            return (
                                <>
                                    {renderedBlocks.map((block, index) => (
                                        <ScrollAnimationBlock
                                            key={`${currentProfile.id}-${index}`}
                                            index={index}
                                            totalBlocks={totalBlocks}
                                            mountTime={mountTime}
                                            isExiting={isExiting}
                                            onExitComplete={handleExitComplete}
                                            blockType={block.type}
                                        >
                                            {block.content}
                                        </ScrollAnimationBlock>
                                    ))}
                                    {currentProfile.infoPills && currentProfile.infoPills.length > 0 && (
                                        <ScrollAnimationBlock
                                            key={`${currentProfile.id}-pills`}
                                            index={renderedBlocks.length}
                                            totalBlocks={totalBlocks}
                                            mountTime={mountTime}
                                            isExiting={isExiting}
                                            onExitComplete={handleExitComplete}
                                            blockType="pills"
                                        >
                                            <InfoPillsBlock pills={currentProfile.infoPills} />
                                        </ScrollAnimationBlock>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </motion.main>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <AnimatePresence>
                {!isMenuOpen && (
                    <motion.div 
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4"
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        <button
                            onClick={handlePrevious}
                            className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center border border-[var(--border)] hover:scale-105 active:scale-105 transition-transform"
                            aria-label="Previous Profile"
                        >
                            <ChevronLeft className="w-8 h-8 text-[var(--foreground)]" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center border border-[var(--border)] hover:scale-105 active:scale-105 transition-transform"
                            aria-label="Next Profile"
                        >
                            <ChevronRight className="w-8 h-8 text-[var(--foreground)]" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Item Details Modal */}
            {selectedItem && (
                <ItemDetailsModal
                    item={selectedItem}
                    isLiked={likedItems.has(
                        'src' in selectedItem ? selectedItem.id : selectedItem.id || ''
                    )}
                    onToggleLike={() => {
                        const id = 'src' in selectedItem
                            ? selectedItem.id
                            : selectedItem.id || '';
                        const summary = 'src' in selectedItem
                            ? selectedItem.likeSummary
                            : selectedItem.likeSummary || selectedItem.answer;
                        toggleLike(id, summary);
                    }}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </div>
    );
}
