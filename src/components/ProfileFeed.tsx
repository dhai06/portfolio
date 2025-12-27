'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import PhotoBlock from './PhotoBlock';
import PromptBlock from './PromptBlock';
import InfoPillsBlock from './InfoPillsBlock';
import DetailsPage from './DetailsPage';
import Menu from './Menu';
import AboutIntroBlock from './AboutIntroBlock';
import { CardData } from '@/data/portfolioData';

interface ProfileFeedProps {
    profiles: CardData[];
}

export default function ProfileFeed({ profiles }: ProfileFeedProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const currentProfile = profiles[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % profiles.length);
    };

    const handlePrevious = () => {
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
                    <h1 className="text-lg font-semibold text-[var(--foreground)]">{currentProfile.name}</h1>
                    {currentProfile.verified && (
                        <BadgeCheck className="w-5 h-5 text-[var(--accent)]" />
                    )}
                </div>
                <Menu profiles={profiles} onSelect={(index) => setCurrentIndex(index)} />
            </header>

            {/* Scrollable Content */}
            <AnimatePresence mode="wait">
                <motion.main
                    key={currentProfile.id}
                    className="pb-24 px-4 py-4 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderBlocks()}
                    <InfoPillsBlock pills={currentProfile.infoPills} />
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
