'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
import { CardData, ImageItem, PromptData, FeedBlock } from '@/data/portfolioData';
import { isPairedBlock, isImageItem, isPromptItem } from '@/data/types';
import { BlockVisibleProvider } from './BlockVisibleContext';
import { slideVariants, scrollBlockAnimation } from '@/lib/animations';
import { TIMING, SPRING } from '@/lib/constants';

interface ProfileFeedProps {
    profiles: CardData[];
}

// Scroll-triggered animation block component with index-based stagger
interface ScrollAnimationBlockProps {
    children: React.ReactNode;
    index: number;
    mountTime: number;
}

function ScrollAnimationBlock({ children, index, mountTime }: ScrollAnimationBlockProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [startAnimation, setStartAnimation] = useState(false);
    const [delay, setDelay] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    // When block enters viewport, calculate delay based on timing
    useLayoutEffect(() => {
        if (isInView && !startAnimation) {
            const now = Date.now();
            const timeSinceMount = now - mountTime;

            // If entering viewport within threshold of mount, use index-based stagger
            const calculatedDelay = timeSinceMount < TIMING.STAGGER_THRESHOLD
                ? index * 0.1
                : 0;

            setDelay(calculatedDelay);
            setStartAnimation(true);
        }
    }, [isInView, startAnimation, index, mountTime]);

    return (
        <motion.div
            ref={ref}
            style={{ willChange: 'transform, opacity' }}
            initial={scrollBlockAnimation.initial}
            animate={startAnimation ? scrollBlockAnimation.animate : scrollBlockAnimation.hidden}
            transition={{
                delay,
                ...SPRING.DEFAULT,
            }}
            onAnimationComplete={() => {
                if (startAnimation && !hasAnimated) {
                    setHasAnimated(true);
                }
            }}
        >
            <BlockVisibleProvider isVisible={hasAnimated}>
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
    const currentProfile = profiles[currentIndex];

    // Track mount time for stagger calculation - resets when profile changes
    const [mountTime, setMountTime] = useState(Date.now());

    // Reset mount time when profile changes
    useEffect(() => {
        setMountTime(Date.now());
    }, [currentIndex]);

    const handleNext = () => {
        setIsInitialMount(false);
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % profiles.length);
    };

    const handlePrevious = () => {
        setIsInitialMount(false);
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + profiles.length) % profiles.length);
    };

    const toggleLike = (id: string, summary: string) => {
        setLikedItems((prev) => {
            const next = new Map(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.set(id, summary);
            }
            return next;
        });
    };

    // Heart click handler: toggles like/unlike AND opens modal (only when liking)
    const handleHeartClick = (item: ImageItem | PromptData, id: string, summary: string) => {
        const isCurrentlyLiked = likedItems.has(id);
        toggleLike(id, summary);
        // Open the modal only if we're liking (not unliking)
        if (!isCurrentlyLiked) {
            setSelectedItem(item);
        }
    };

    // Render blocks based on the new unified blocks array
    const renderBlocks = () => {
        const renderedBlocks: React.ReactNode[] = [];

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
                    renderedBlocks.push(
                        <AboutIntroBlock
                            key={`paired-about-${index}`}
                            imageSrc={block.image.src}
                            imageAlt={currentProfile.name}
                            isLiked={likedItems.has(block.id)}
                            onHeartClick={() => handleHeartClick(pairedItem, block.id, block.likeSummary)}
                            onBlockClick={() => setSelectedItem(pairedItem)}
                        />
                    );
                } else {
                    // Regular paired block with alternating layout - both parts share the same ID
                    renderedBlocks.push(
                        <PairedBlock
                            key={`paired-${index}`}
                            block={block}
                            isLiked={likedItems.has(block.id)}
                            onHeartClick={() => handleHeartClick(pairedItem, block.id, block.likeSummary)}
                            onBlockClick={() => setSelectedItem(pairedItem)}
                            index={index}
                        />
                    );
                }
            } else if (isImageItem(block)) {
                // Standalone image
                renderedBlocks.push(
                    <PhotoBlock
                        key={`img-${index}`}
                        src={block.src}
                        alt={currentProfile.name}
                        isLiked={likedItems.has(block.id)}
                        onHeartClick={() => handleHeartClick(block, block.id, block.likeSummary)}
                        onBlockClick={() => setSelectedItem(block)}
                    />
                );
            } else if (isPromptItem(block)) {
                // Standalone prompt
                const promptId = block.id || `prompt-${index}`;
                const promptSummary = block.likeSummary || block.answer;
                renderedBlocks.push(
                    <PromptBlock
                        key={`prompt-${index}`}
                        prompt={block}
                        isLiked={likedItems.has(promptId)}
                        onHeartClick={() => handleHeartClick(block, promptId, promptSummary)}
                        onBlockClick={() => setSelectedItem(block)}
                    />
                );
            }
        });

        // Append SummaryBlock on contact page
        if (currentProfile.type === 'contact') {
            renderedBlocks.push(
                <SummaryBlock key="summary" likedSummaries={[...likedItems.values()]} />
            );
        }

        return renderedBlocks;
    };

    return (
        <div className="min-h-screen bg-[var(--background)]">
            {/* Sticky Header */}
            <header className="sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--border)] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-lg font-medium text-[var(--foreground)]">
                        {currentProfile.name}
                    </h1>
                </div>
                <Menu
                    profiles={profiles}
                    onSelect={(index) => {
                        setIsInitialMount(false);
                        setCurrentIndex(index);
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
                        {renderBlocks().map((block, index) => (
                            <ScrollAnimationBlock
                                key={`${currentProfile.id}-${index}`}
                                index={index}
                                mountTime={mountTime}
                            >
                                {block}
                            </ScrollAnimationBlock>
                        ))}
                        {currentProfile.infoPills && currentProfile.infoPills.length > 0 && (
                            <ScrollAnimationBlock
                                key={`${currentProfile.id}-pills`}
                                index={renderBlocks().length}
                                mountTime={mountTime}
                            >
                                <InfoPillsBlock pills={currentProfile.infoPills} />
                            </ScrollAnimationBlock>
                        )}
                    </div>
                </motion.main>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
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
            </div>

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
