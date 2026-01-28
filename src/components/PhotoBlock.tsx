'use client';

import Image from 'next/image';
import { HeartButton } from './ui';

interface PhotoBlockProps {
    src: string;
    alt: string;
    isLiked: boolean;
    onHeartClick: () => void;
    onBlockClick?: () => void;
}

export default function PhotoBlock({
    src,
    alt,
    isLiked,
    onHeartClick,
    onBlockClick,
}: PhotoBlockProps) {
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
                priority
            />
            <HeartButton
                isLiked={isLiked}
                onClick={onHeartClick}
                variant="overlay"
            />
        </div>
    );
}
