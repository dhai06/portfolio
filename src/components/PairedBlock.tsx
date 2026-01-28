'use client';

import { memo } from 'react';
import Image from 'next/image';
import { HeartButton } from './ui';
import TypewriterText from './TypewriterText';
import SocialLinks from './about/SocialLinks';
import type { PairedBlock as PairedBlockType } from '@/data/types';

interface PairedBlockProps {
    block: PairedBlockType;
    /** Both parts share the same liked state */
    isLiked: boolean;
    /** Both parts share the same heart click handler */
    onHeartClick: () => void;
    /** Both parts open the same modal */
    onBlockClick?: () => void;
    /** Index of this block - used to prioritize loading for first few blocks */
    index?: number;
}

/**
 * PairedBlock - Memoized component for image + prompt side-by-side layout
 * Optimized with smart image loading based on position
 */
const PairedBlock = memo(function PairedBlock({
    block,
    isLiked,
    onHeartClick,
    onBlockClick,
    index = 0,
}: PairedBlockProps) {
    const { image, prompt, layout } = block;
    const isImageLeft = layout === 'image-left';
    // Prioritize loading for first 2 blocks (above the fold)
    const shouldPrioritize = index < 2;

    const ImageBlock = (
        <div
            className="md:col-span-2 relative h-full min-h-[350px] bg-gray-100 rounded-3xl overflow-hidden group cursor-pointer"
            onClick={onBlockClick}
        >
            <Image
                src={image.src}
                alt={block.likeSummary || 'Image'}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className={`${image.objectFit === 'contain' ? 'object-contain' : 'object-cover'} transition-transform duration-500 ease-out group-hover:scale-105`}
                style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
                priority={shouldPrioritize}
                loading={shouldPrioritize ? 'eager' : 'lazy'}
            />
            {/* Heart button overlay */}
            <HeartButton
                isLiked={isLiked}
                onClick={onHeartClick}
                variant="overlay"
            />
        </div>
    );

    const isContactType = prompt.contentType === 'contact';

    const PromptBlockEl = (
        <div
            className={`md:col-span-3 relative bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer min-h-[350px] flex flex-col ${isContactType ? '' : 'pb-20'}`}
            onClick={onBlockClick}
        >
            {/* Question */}
            <p className="text-xs uppercase font-bold tracking-widest text-[var(--foreground)]/50 mb-3">
                {prompt.question}
            </p>
            {/* Answer - centered in remaining space */}
            <div className="flex-1 flex items-center">
                <p className="text-xl md:text-3xl font-serif font-bold text-[var(--foreground)] leading-tight break-words">
                    <TypewriterText text={prompt.answer} />
                </p>
            </div>
            {/* Contact type: Social links & Heart with divider line */}
            {isContactType ? (
                <div className="flex flex-wrap items-center gap-x-3 gap-y-4 pt-4 mt-6 border-t border-gray-100">
                    <SocialLinks />
                    <div className="flex-1" />
                    <HeartButton
                        isLiked={isLiked}
                        onClick={onHeartClick}
                    />
                </div>
            ) : (
                /* Heart button overlay for non-contact types */
                <HeartButton
                    isLiked={isLiked}
                    onClick={onHeartClick}
                    variant="overlay"
                />
            )}
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
            {isImageLeft ? (
                <>
                    {ImageBlock}
                    {PromptBlockEl}
                </>
            ) : (
                <>
                    {PromptBlockEl}
                    {ImageBlock}
                </>
            )}
        </div>
    );
});

export default PairedBlock;
