'use client';

import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { PromptData } from '@/data/portfolioData';
import TypewriterText from './TypewriterText';
import ArtistCarousel from './ArtistCarousel';
import MovieRail from './MovieRail';
import SkillsRail from './SkillsRail';

interface PromptBlockProps {
    prompt: PromptData;
    isLiked: boolean;
    onHeartClick: () => void;
    onBlockClick?: () => void;
}

// Check if this prompt should show the artist carousel
const isArtistPrompt = (question: string) =>
    question.toLowerCase().includes('music taste') || question.toLowerCase().includes('favourite artist');

// Check if this prompt should show the movie rail
const isMoviePrompt = (question: string) => {
    const lower = question.toLowerCase();
    return lower.includes('movie') || lower.includes('show') || lower.includes('tv');
};

// Check if this prompt should show the skills rail
const isSkillsPrompt = (question: string) => {
    const lower = question.toLowerCase();
    return lower.includes('skill') || lower.includes('technologies') || lower.includes('tech stack');
};

export default function PromptBlock({ prompt, isLiked, onHeartClick, onBlockClick }: PromptBlockProps) {
    const showArtistCarousel = isArtistPrompt(prompt.question);
    const showMovieRail = isMoviePrompt(prompt.question);
    const showSkillsRail = isSkillsPrompt(prompt.question);

    return (
        <div
            className="relative bg-white p-8 pb-20 rounded-3xl my-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer"
            onClick={onBlockClick}
        >
            <p className="text-xs uppercase font-bold tracking-widest text-[var(--foreground)]/50 mb-3">{prompt.question}</p>
            {showArtistCarousel ? (
                <ArtistCarousel />
            ) : showMovieRail ? (
                <MovieRail />
            ) : showSkillsRail ? (
                <SkillsRail />
            ) : (
                <p className="text-xl md:text-3xl font-serif font-bold text-[var(--foreground)] leading-tight break-words">
                    <TypewriterText text={prompt.answer} />
                </p>
            )}
            {/* Like button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onHeartClick();
                }}
                className="group/heart absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100 hover:border-red-500 active:border-red-500 hover:shadow-xl active:shadow-xl hover:bg-red-50 active:bg-red-50 transition-all"
                aria-label="Like"
            >
                <motion.div
                    animate={{ scale: isLiked ? [1, 1.4, 1] : 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                >
                    <Heart
                        className={`w-6 h-6 transition-colors duration-200 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/heart:text-red-500 group-active/heart:text-red-500'}`}
                    />
                </motion.div>
            </button>
        </div>
    );
}

