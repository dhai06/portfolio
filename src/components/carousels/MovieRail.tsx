'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEndlessCarousel } from '@/hooks';
import { GradientEdges } from '@/components/ui';
import { carouselItemHover } from '@/lib/animations';
import { movies } from '@/data/portfolioData';
import { useImagePreload } from '@/context/ImagePreloadContext';

const ITEM_SELECTOR = '.movie-item';

// Skeleton placeholder for loading state
function MovieRailSkeleton() {
    return (
        <div className="relative w-full overflow-hidden py-8">
            <GradientEdges />
            <div className="flex gap-4 px-16 md:px-24 w-max">
                {Array.from({ length: 7 }).map((_, index) => (
                    <div
                        key={index}
                        className="relative flex-shrink-0 movie-item"
                    >
                        <div className="relative w-32 h-48 md:w-40 md:h-60 rounded-xl overflow-hidden shadow-lg select-none bg-gray-200 animate-pulse" />
                    </div>
                ))}
            </div>
        </div>
    );
}

// Main carousel content
function MovieRailContent() {
    const { containerRef, x, panHandlers, itemHandlers } = useEndlessCarousel({
        itemCount: movies.length,
        itemSelector: ITEM_SELECTOR,
    });

    // Create 3 sets for endless scrolling
    const endlessMovies = [...movies, ...movies, ...movies];

    return (
        <div className="relative w-full overflow-hidden py-8">
            <GradientEdges />

            <motion.div
                ref={containerRef}
                className="flex gap-4 px-16 md:px-24 w-max cursor-grab active:cursor-grabbing"
                style={{ x, touchAction: 'pan-y' }}
                onClick={panHandlers.onClick}
                onPanStart={panHandlers.onPanStart}
                onPan={panHandlers.onPan}
                onPanEnd={panHandlers.onPanEnd}
            >
                {endlessMovies.map((movie, index) => (
                    <motion.div
                        key={`${movie.title}-${index}`}
                        className="relative flex-shrink-0 movie-item"
                        whileHover={carouselItemHover.whileHover}
                        transition={carouselItemHover.transition}
                        onPointerDown={itemHandlers.onPointerDown}
                        onClick={itemHandlers.onClick}
                    >
                        <div className="relative w-32 h-48 md:w-40 md:h-60 rounded-xl overflow-hidden shadow-lg select-none">
                            <Image
                                src={movie.poster}
                                alt={movie.title}
                                fill
                                className="object-cover pointer-events-none"
                                sizes="(max-width: 768px) 128px, 160px"
                                draggable={false}
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default function MovieRail() {
    const { isLoaded } = useImagePreload();

    // Show skeleton while preloading, then instantly show carousel (no animation)
    if (!isLoaded) {
        return <MovieRailSkeleton />;
    }

    return <MovieRailContent />;
}
