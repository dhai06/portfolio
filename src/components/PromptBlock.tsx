'use client';

import { PromptData } from '@/data/portfolioData';
import { HeartButton } from './ui';
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

// Render content based on contentType (type-based) or fallback to string detection
function renderContent(prompt: PromptData) {
    // Use contentType if available (new type-based approach)
    if (prompt.contentType) {
        switch (prompt.contentType) {
            case 'artist':
                return <ArtistCarousel />;
            case 'movie':
                return <MovieRail />;
            case 'skills':
                return <SkillsRail />;
            case 'intro':
                // Intro prompts are handled by AboutIntroBlock, but render text as fallback
                return (
                    <p className="text-xl md:text-3xl font-serif font-bold text-[var(--foreground)] leading-tight break-words">
                        <TypewriterText text={prompt.answer} />
                    </p>
                );
            case 'text':
            default:
                return (
                    <p className="text-xl md:text-3xl font-serif font-bold text-[var(--foreground)] leading-tight break-words">
                        <TypewriterText text={prompt.answer} />
                    </p>
                );
        }
    }

    // Fallback to string-based detection for backward compatibility
    const question = prompt.question.toLowerCase();

    if (question.includes('music taste') || question.includes('favourite artist')) {
        return <ArtistCarousel />;
    }

    if (question.includes('movie') || question.includes('show') || question.includes('tv')) {
        return <MovieRail />;
    }

    if (question.includes('skill') || question.includes('technologies') || question.includes('tech stack')) {
        return <SkillsRail />;
    }

    // Default text rendering
    return (
        <p className="text-xl md:text-3xl font-serif font-bold text-[var(--foreground)] leading-tight break-words">
            <TypewriterText text={prompt.answer} />
        </p>
    );
}

export default function PromptBlock({
    prompt,
    isLiked,
    onHeartClick,
    onBlockClick,
}: PromptBlockProps) {
    return (
        <div
            className="relative bg-white p-8 pb-20 rounded-3xl my-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer"
            onClick={onBlockClick}
        >
            <p className="text-xs uppercase font-bold tracking-widest text-[var(--foreground)]/50 mb-3">
                {prompt.question}
            </p>
            {renderContent(prompt)}
            <HeartButton
                isLiked={isLiked}
                onClick={onHeartClick}
                variant="overlay"
            />
        </div>
    );
}
