'use client';

import { useState, useEffect, useCallback, useRef, memo, useMemo } from 'react';
import { motion, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { artists } from '@/data/portfolioData';

// Calculate circular distance (shortest path around the ring)
function getCircularDistance(index: number, currentIndex: number, total: number): number {
    let diff = index - currentIndex;

    // Normalize to shortest path: if going the long way, wrap around
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return diff;
}

// Hoisted outside component to prevent recreation (rendering-hoist-jsx)
const SPRING_TRANSITION = {
    type: 'spring' as const,
    stiffness: 200,
    damping: 30,
};

// Get 3D style based on position distance from center - responsive version
function getStyleForPosition(distance: number, isMobile: boolean) {
    // Center item
    if (distance === 0) {
        return {
            x: '0%',
            scale: 1,
            zIndex: 50,
            rotateY: 0,
            opacity: 1,
        };
    }

    // Immediate neighbors (±1) - always visible
    if (distance === 1) {
        return {
            x: isMobile ? '55%' : '65%',
            scale: isMobile ? 0.65 : 0.75,
            zIndex: 30,
            rotateY: isMobile ? -45 : -45,
            opacity: 0.8,
        };
    }
    if (distance === -1) {
        return {
            x: isMobile ? '-55%' : '-65%',
            scale: isMobile ? 0.65 : 0.75,
            zIndex: 30,
            rotateY: isMobile ? 45 : 45,
            opacity: 0.8,
        };
    }

    // Far neighbors (±2) - only visible on desktop
    if (distance === 2) {
        return {
            x: isMobile ? '80%' : '110%',
            scale: isMobile ? 0.4 : 0.55,
            zIndex: 10,
            rotateY: -60,
            opacity: isMobile ? 0 : 0.4,
        };
    }
    if (distance === -2) {
        return {
            x: isMobile ? '-80%' : '-110%',
            scale: isMobile ? 0.4 : 0.55,
            zIndex: 10,
            rotateY: 60,
            opacity: isMobile ? 0 : 0.4,
        };
    }

    // All other items - hidden behind
    return {
        x: '0%',
        scale: 0.3,
        zIndex: 0,
        rotateY: 0,
        opacity: 0,
    };
}

/**
 * ArtistCarousel - 3D rotating carousel for favorite artists
 * Renders immediately with lazy-loaded images (no skeleton swap)
 */
const ArtistCarousel = memo(function ArtistCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const isDragging = useRef(false);

    // Prevent parent click when dragging
    const handleClick = useCallback((e: React.MouseEvent) => {
        if (isDragging.current) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, []);

    // Detect mobile viewport - use passive listener for better scroll performance
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile, { passive: true });
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Navigation handlers
    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % artists.length);
    }, []);

    const goPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + artists.length) % artists.length);
    }, []);

    // Auto-advance carousel (pause on hover)
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(goNext, 3000);
        return () => clearInterval(interval);
    }, [isPaused, goNext]);

    // Handle drag/swipe
    const handleDragStart = () => {
        isDragging.current = true;
    };

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50;
        if (info.offset.x > threshold) {
            goPrev();
        } else if (info.offset.x < -threshold) {
            goNext();
        }
        // Reset drag state after a short delay to prevent click from firing
        setTimeout(() => {
            isDragging.current = false;
        }, 100);
    };

    // Handle clicking on side images
    const handleImageClick = useCallback((distance: number) => {
        if (distance > 0) goNext();
        if (distance < 0) goPrev();
    }, [goNext, goPrev]);

    // Only render visible items (within ±2 of current) to reduce DOM elements
    // This reduces from 11 animated elements to 5 at most
    const visibleArtists = useMemo(() => {
        return artists.map((artist, index) => {
            const distance = getCircularDistance(index, currentIndex, artists.length);
            // Only render items within visible range
            if (Math.abs(distance) > 2) return null;
            return { artist, index, distance };
        }).filter(Boolean) as { artist: typeof artists[0]; index: number; distance: number }[];
    }, [currentIndex]);

    return (
        <div
            className="relative w-full h-44 md:h-56 mt-2 overflow-visible [transform-style:preserve-3d] [perspective:500px] md:overflow-x-clip md:overflow-y-visible md:[perspective:1000px] pb-12 md:pb-8 rounded-2xl cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onClick={handleClick}
            style={{
                perspectiveOrigin: isMobile ? '50% 40%' : '50% 50%'
            }}
        >
            <motion.div
                className="relative w-full h-full flex items-center justify-center py-12 md:py-0"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {visibleArtists.map(({ artist, index, distance }) => {
                    const style = getStyleForPosition(distance, isMobile);
                    const isClickable = distance !== 0;

                    return (
                        <motion.div
                            key={artist.name}
                            className={`absolute w-28 h-28 md:w-56 md:h-56 rounded-2xl overflow-hidden ${isClickable ? 'cursor-pointer' : ''}`}
                            animate={style}
                            transition={SPRING_TRANSITION}
                            onClick={() => isClickable && handleImageClick(distance)}
                            style={{
                                transformStyle: 'preserve-3d',
                                filter: distance === 0
                                    ? 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.35))'
                                    : 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.25))',
                            }}
                        >
                            <Image
                                src={artist.image}
                                alt={artist.name}
                                fill
                                className="object-cover pointer-events-none"
                                sizes="(max-width: 768px) 112px, 224px"
                                draggable={false}
                                loading="lazy"
                            />
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
});

export default ArtistCarousel;
