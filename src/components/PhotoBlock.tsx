'use client';

import { memo } from 'react';
import Image from 'next/image';
import { HeartButton } from './ui';

interface PhotoBlockProps {
    src: string;
    alt: string;
    isLiked: boolean;
    onHeartClick: () => void;
    onBlockClick?: () => void;
    /** Index of this block - used to prioritize loading for first few blocks */
    index?: number;
}

/**
 * PhotoBlock - Optimized image block with smart loading strategy
 * - First 2 blocks load eagerly (above the fold)
 * - Remaining blocks use lazy loading
 * - Memoized to prevent unnecessary re-renders
 */
const PhotoBlock = memo(function PhotoBlock({
    src,
    alt,
    isLiked,
    onHeartClick,
    onBlockClick,
    index = 999, // Default high index for lazy loading
}: PhotoBlockProps) {
    // Only first 2 images get priority loading (above the fold)
    const shouldPrioritize = index < 2;

    return (
        <div
            className="relative w-full aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden group cursor-pointer"
            onClick={onBlockClick}
        >
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                priority={shouldPrioritize}
                loading={shouldPrioritize ? 'eager' : 'lazy'}
            />
            <HeartButton
                isLiked={isLiked}
                onClick={onHeartClick}
                variant="overlay"
            />
        </div>
    );
});

export default PhotoBlock;
