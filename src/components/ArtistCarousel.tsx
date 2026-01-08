'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import Image from 'next/image';

// Artist images from the favourite artists folder
const artistImages = [
    '/images/favourite artists/0x1900-000000-80-0-0 (1).jpg',
    '/images/favourite artists/0x1900-000000-80-0-0.jpg',
    '/images/favourite artists/5d2cfd9f2b02809c420d2386cccbe0da.1000x1000x1.png',
    '/images/favourite artists/Cover_of_The_Black_Skirts\'s_album_Team_Baby.png',
    '/images/favourite artists/Eric_Chou_The_Chaos_After_You_album_artwork.jpg',
    '/images/favourite artists/GD00068962.default.1.jpg',
    '/images/favourite artists/Legend,_album_cover,_March_2019.jpg',
    '/images/favourite artists/ab67616d0000b2733138f891f3075c9c5d944037.jpg',
    '/images/favourite artists/ab67616d0000b273c091fe6573f073f2e31b249f.jpg',
    '/images/favourite artists/https___images.genius.com_662eb5996444b8308d9368f9794c7a26.1000x1000x1.png',
    '/images/favourite artists/images.jpg',
];

// Calculate circular distance (shortest path around the ring)
function getCircularDistance(index: number, currentIndex: number, total: number): number {
    let diff = index - currentIndex;

    // Normalize to shortest path: if going the long way, wrap around
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return diff;
}

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
            opacity: isMobile ? 0 : 0.4, // Hidden on mobile
        };
    }
    if (distance === -2) {
        return {
            x: isMobile ? '-80%' : '-110%',
            scale: isMobile ? 0.4 : 0.55,
            zIndex: 10,
            rotateY: 60,
            opacity: isMobile ? 0 : 0.4, // Hidden on mobile
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

export default function ArtistCarousel() {
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

    // Detect mobile viewport
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Navigation handlers
    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % artistImages.length);
    }, []);

    const goPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + artistImages.length) % artistImages.length);
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
    const handleImageClick = (distance: number) => {
        if (distance > 0) goNext();
        if (distance < 0) goPrev();
    };

    // Smooth spring transition
    const transition = {
        type: 'spring' as const,
        stiffness: 200,
        damping: 30,
    };

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
                {/* Render ALL images with stable keys */}
                {artistImages.map((src, index) => {
                    const distance = getCircularDistance(index, currentIndex, artistImages.length);
                    const style = getStyleForPosition(distance, isMobile);
                    const isClickable = distance !== 0 && Math.abs(distance) <= 2;

                    return (
                        <motion.div
                            key={src} // Stable key - element persists and animates
                            className={`absolute w-28 h-28 md:w-56 md:h-56 rounded-2xl overflow-hidden ${isClickable ? 'cursor-pointer' : ''
                                }`}
                            animate={style}
                            transition={transition}
                            onClick={() => isClickable && handleImageClick(distance)}
                            style={{
                                transformStyle: 'preserve-3d',
                                boxShadow: distance === 0
                                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
                                    : '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            <Image
                                src={src}
                                alt={`Artist ${index + 1}`}
                                fill
                                className="object-cover pointer-events-none"
                                sizes="(max-width: 768px) 112px, 224px"
                                priority={Math.abs(distance) <= 1}
                            />
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
