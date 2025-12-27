'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import PhotoBlock from './PhotoBlock';
import PromptBlock from './PromptBlock';
import InfoPillsBlock from './InfoPillsBlock';
import DetailsPage from './DetailsPage';
import Menu from './Menu';
import AboutIntroBlock from './AboutIntroBlock';
import { CardData } from '@/data/portfolioData';
import React, { useRef } from 'react';
import { BlockVisibleProvider } from './BlockVisibleContext';

interface ProfileFeedProps {
    profiles: CardData[];
}

// Slide animation variants for Feature 3
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
};

// Stagger animation variants for Feature 4
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            bounce: 0.4,
            duration: 0.8
        }
    }
};

// Sequential animation block component
interface SequentialBlockProps {
    children: React.ReactNode;
    canAnimate: boolean;
    onComplete: () => void;
}

function SequentialBlock({ children, canAnimate, onComplete }: SequentialBlockProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [hasAnimated, setHasAnimated] = useState(false);

    // Only animate if in view AND previous block has completed
    const shouldAnimate = isInView && canAnimate && !hasAnimated;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={shouldAnimate || hasAnimated ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
            }}
            onAnimationComplete={() => {
                if (shouldAnimate && !hasAnimated) {
                    setHasAnimated(true);
                    onComplete();
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
    const [showDetails, setShowDetails] = useState(false);
    const [direction, setDirection] = useState(0);
    const [isInitialMount, setIsInitialMount] = useState(true);
    const [animatedBlocks, setAnimatedBlocks] = useState<Set<number>>(new Set([0])); // Start with first block ready
    const currentProfile = profiles[currentIndex];

    // Reset animated blocks when profile changes
    useEffect(() => {
        setAnimatedBlocks(new Set([0]));
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

    const handleLike = () => {
        setShowDetails(true);
    };

    // Interleave images and prompts for a Hinge-like feed
    const renderBlocks = () => {
        const blocks: React.ReactNode[] = [];
        const maxLen = Math.max(currentProfile.images.length, currentProfile.prompts.length);

        // For about page, render first image and first prompt side by side
        if (currentProfile.type === 'about' && currentProfile.images[0]) {
            blocks.push(
                <AboutIntroBlock
                    key="about-intro-0"
                    imageSrc={currentProfile.images[0]}
                    imageAlt={currentProfile.name}
                    onLike={handleLike}
                />
            );

            // Continue with remaining blocks starting from index 1
            for (let i = 1; i < maxLen; i++) {
                if (currentProfile.images[i]) {
                    blocks.push(
                        <PhotoBlock
                            key={`img-${i}`}
                            src={currentProfile.images[i]}
                            alt={currentProfile.name}
                            onLike={handleLike}
                        />
                    );
                }
                if (currentProfile.prompts[i]) {
                    blocks.push(
                        <PromptBlock
                            key={`prompt-${i}`}
                            prompt={currentProfile.prompts[i]}
                            onLike={handleLike}
                        />
                    );
                }
            }
        } else {
            // For other profile types, use normal interleaving
            for (let i = 0; i < maxLen; i++) {
                if (currentProfile.images[i]) {
                    blocks.push(
                        <PhotoBlock
                            key={`img-${i}`}
                            src={currentProfile.images[i]}
                            alt={currentProfile.name}
                            onLike={handleLike}
                        />
                    );
                }
                if (currentProfile.prompts[i]) {
                    blocks.push(
                        <PromptBlock
                            key={`prompt-${i}`}
                            prompt={currentProfile.prompts[i]}
                            onLike={handleLike}
                        />
                    );
                }
            }
        }
        return blocks;
    };

    return (
        <div className="min-h-screen bg-[var(--background)]">
            {/* Sticky Header */}
            <header className="sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--border)] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-lg font-medium text-[var(--foreground)]">{currentProfile.name}</h1>
                    {currentProfile.verified && (
                        <BadgeCheck className="w-5 h-5 text-[var(--accent)]" />
                    )}
                </div>
                <Menu profiles={profiles} onSelect={(index) => {
                    setIsInitialMount(false);
                    setCurrentIndex(index);
                }} />
            </header>

            {/* Scrollable Content with Slide Animation */}
            <AnimatePresence mode="popLayout" custom={direction}>
                <motion.main
                    key={currentProfile.id}
                    custom={direction}
                    variants={slideVariants}
                    initial={isInitialMount ? { opacity: 1, x: 0 } : "enter"}
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    className="pb-24 px-4 py-4"
                >
                    {/* Blocks animate sequentially - each waits for previous to complete */}
                    <div className="space-y-4">
                        {renderBlocks().map((block, index) => {
                            const canAnimate = animatedBlocks.has(index);
                            return (
                                <SequentialBlock
                                    key={`${currentProfile.id}-${index}`}
                                    canAnimate={canAnimate}
                                    onComplete={() => {
                                        setAnimatedBlocks(prev => new Set([...prev, index + 1]));
                                    }}
                                >
                                    {block}
                                </SequentialBlock>
                            );
                        })}
                        <SequentialBlock
                            key={`${currentProfile.id}-pills`}
                            canAnimate={animatedBlocks.has(renderBlocks().length)}
                            onComplete={() => { }}
                        >
                            <InfoPillsBlock pills={currentProfile.infoPills} />
                        </SequentialBlock>
                    </div>
                </motion.main>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
                <button
                    onClick={handlePrevious}
                    className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center border border-[var(--border)] hover:scale-105 transition-transform"
                    aria-label="Previous Profile"
                >
                    <ChevronLeft className="w-8 h-8 text-[var(--foreground)]" />
                </button>
                <button
                    onClick={handleNext}
                    className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center border border-[var(--border)] hover:scale-105 transition-transform"
                    aria-label="Next Profile"
                >
                    <ChevronRight className="w-8 h-8 text-[var(--foreground)]" />
                </button>
            </div>

            {/* Details Page */}
            <AnimatePresence>
                {showDetails && (
                    <DetailsPage
                        profile={currentProfile}
                        onClose={() => setShowDetails(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
