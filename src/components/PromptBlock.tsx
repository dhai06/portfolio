'use client';

import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { PromptData } from '@/data/portfolioData';
import TypewriterText from './TypewriterText';
import ArtistCarousel from './ArtistCarousel';

interface PromptBlockProps {
    prompt: PromptData;
    isLiked: boolean;
    onHeartClick: () => void;
}

// Check if this prompt should show the artist carousel
const isArtistPrompt = (question: string) =>
    question.toLowerCase().includes('music taste') || question.toLowerCase().includes('favourite artist');

export default function PromptBlock({ prompt, isLiked, onHeartClick }: PromptBlockProps) {
    const showArtistCarousel = isArtistPrompt(prompt.question);

    return (
        <div className="relative bg-white p-8 pb-20 rounded-3xl my-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <p className="text-xs uppercase font-bold tracking-widest text-[var(--foreground)]/50 mb-3">{prompt.question}</p>
            {showArtistCarousel ? (
                <ArtistCarousel />
            ) : (
                <p className="text-xl md:text-3xl font-serif font-bold text-[var(--foreground)] leading-tight break-words">
                    <TypewriterText text={prompt.answer} />
                </p>
            )}
            {/* Like button */}
            <button
                onClick={onHeartClick}
                className="group/heart absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100 hover:border-red-500 hover:shadow-xl hover:bg-red-50 transition-all"
                aria-label="Like"
            >
                <motion.div
                    animate={{ scale: isLiked ? [1, 1.4, 1] : 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                >
                    <Heart
                        className={`w-6 h-6 transition-colors duration-200 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/heart:text-red-500'}`}
                    />
                </motion.div>
            </button>
        </div>
    );
}

