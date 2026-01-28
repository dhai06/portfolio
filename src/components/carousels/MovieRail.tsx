'use client';

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEndlessCarousel } from '@/hooks';
import GradientEdges from '@/components/ui/GradientEdges';
import { movies } from '@/data/portfolioData';

const ITEM_SELECTOR = '.movie-item';

/**
 * MovieRail - Endless scrolling carousel for movies/shows
 *
 * Performance optimizations:
 * - Uses 2x array instead of 3x (20 items vs 30)
 * - First set of images are eager-loaded (preloaded by ImagePreloadProvider)
 * - GPU-accelerated transforms via will-change
 */
const MovieRail = memo(function MovieRail() {
    const { containerRef, x, panHandlers, itemHandlers } = useEndlessCarousel({
        itemCount: movies.length,
        itemSelector: ITEM_SELECTOR,
    });

    // Use 2x array - still provides seamless looping with fewer DOM nodes
    const endlessMovies = useMemo(() => [...movies, ...movies], []);

    return (
        <div className="relative w-full overflow-x-clip overflow-y-visible py-8">
            <GradientEdges />

            <motion.div
                ref={containerRef}
                className="flex gap-4 px-16 md:px-24 w-max cursor-grab active:cursor-grabbing"
                style={{ x, touchAction: 'pan-y', willChange: 'transform' }}
                onClick={panHandlers.onClick}
                onPanStart={panHandlers.onPanStart}
                onPan={panHandlers.onPan}
                onPanEnd={panHandlers.onPanEnd}
            >
                {endlessMovies.map((movie, index) => {
                    // First set of images are eager-loaded (already preloaded)
                    const isFirstSet = index < movies.length;

                    return (
                        <div
                            key={`${movie.title}-${index}`}
                            className="relative flex-shrink-0 movie-item"
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
                                    loading={isFirstSet ? 'eager' : 'lazy'}
                                    priority={isFirstSet}
                                />
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
});

export default MovieRail;
