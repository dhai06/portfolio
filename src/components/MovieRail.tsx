'use client';

import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

const movies = [
    { title: "Howl's Moving Castle", poster: '/images/movies-shows/Howls-moving-castleposter.jpg' },
    { title: 'Movie Poster 1', poster: '/images/movies-shows/MV5BMjA4NzYxNWItZWJmNi00ODE2LTgwZDgtMzBkN2MzOGZhNDEzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
    { title: 'Movie Poster 2', poster: '/images/movies-shows/MV5BODI3NzUwYTktMjlkYS00MDNiLTg0MjgtNWQ1NWZkYmQ2Mzk4XkEyXkFqcGc@._V1_.jpg' },
    { title: 'Movie Poster 3', poster: '/images/movies-shows/MV5BYWM2NTM4MTktNDFiNi00NTI3LThiZTgtZmJiZTQ2NzdhNDE3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
    { title: 'Our Beloved Summer', poster: '/images/movies-shows/Our_Beloved_Summer.jpg' },
    { title: 'Show Poster', poster: '/images/movies-shows/VXzRyz_4f.jpg' },
    { title: 'When Life Gives You Tangerines', poster: '/images/movies-shows/When_Life_Gives_You_Tangerines_poster.png' },
    { title: 'Fresh Off The Boat', poster: '/images/movies-shows/fotb.jpg' },
    { title: 'Show Poster 2', poster: '/images/movies-shows/images.jpg' },
    { title: 'Movie Poster 4', poster: '/images/movies-shows/p27192445_v_v8_ab.jpg' },
];

const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function MovieRail() {
    // Create 3 sets - we'll start at the middle one for buffer on both sides
    const endlessMovies = [...movies, ...movies, ...movies];
    const containerRef = useRef<HTMLDivElement>(null);
    const [oneSetWidth, setOneSetWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // Use ref instead of state to avoid re-renders and timing issues
    const hasDraggedRef = useRef(false);

    // Core Motion Values
    const baseX = useMotionValue(0);
    const velocity = useMotionValue(0);

    // Configuration
    const baseVelocity = -0.5; // Default crawl speed
    const friction = 0.95;     // How quickly it slows down (0.9 to 0.99)

    useEffect(() => {
        if (!containerRef.current) return;
        const firstMovie = containerRef.current.querySelector('.movie-item');
        if (firstMovie) {
            const totalWidth = (firstMovie.clientWidth + 16) * movies.length;
            setOneSetWidth(totalWidth);
            // Start at the middle set to have buffer on both sides
            baseX.set(-totalWidth);
        }
    }, [baseX]);

    useAnimationFrame((t, delta) => {
        if (!oneSetWidth) return;

        let currentVelocity = velocity.get();

        // Always apply friction - this creates seamless transitions
        currentVelocity *= friction;

        // If the velocity gets very small, snap it to zero
        if (Math.abs(currentVelocity) < 0.1) {
            currentVelocity = 0;
        }
        velocity.set(currentVelocity);

        // Final movement: Base crawl + current momentum
        const moveBy = (baseVelocity + currentVelocity) * (delta / 16);
        baseX.set(baseX.get() + moveBy);
    });

    const x = useTransform(baseX, (v) => {
        if (!oneSetWidth) return 0;
        // Wrap between -2*oneSetWidth and -oneSetWidth (loop to middle for seamless animation)
        return wrap(-2 * oneSetWidth, -oneSetWidth, v);
    });

    return (
        <div className="relative w-full overflow-hidden py-8">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <motion.div
                ref={containerRef}
                className="flex gap-4 px-16 md:px-24 w-max cursor-grab active:cursor-grabbing"
                style={{ x, touchAction: 'pan-y' }}
                onClick={(e) => {
                    // Stop propagation to parent PromptBlock if we dragged or moving fast
                    if (hasDraggedRef.current || Math.abs(velocity.get()) > 0.5) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                }}
                onPanStart={() => {
                    setIsDragging(true);
                    hasDraggedRef.current = false;
                }}
                onPan={(e, info) => {
                    // Track that an actual drag occurred
                    if (Math.abs(info.offset.x) > 5) {
                        hasDraggedRef.current = true;
                    }
                    // Only update position during drag, NOT velocity
                    // This prevents the velocity from dipping during drag
                    baseX.set(baseX.get() + info.delta.x);
                }}
                onPanEnd={(e, info) => {
                    setIsDragging(false);
                    // Set velocity only on release for seamless transition
                    // info.velocity.x is px/ms. We scale it down to fit our loop
                    const finalVelocity = info.velocity.x * 0.05;
                    velocity.set(finalVelocity);

                    // Clear hasDragged after a delay
                    setTimeout(() => {
                        hasDraggedRef.current = false;
                    }, 150);
                }}
            >
                {endlessMovies.map((movie, index) => (
                    <motion.div
                        key={`${movie.title}-${index}`}
                        className="relative flex-shrink-0 movie-item"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        onPointerDown={(e) => {
                            // Reset on each pointer down
                            hasDraggedRef.current = false;
                        }}
                        onClick={(e) => {
                            // Prevent click if we just dragged or velocity is high
                            if (hasDraggedRef.current || Math.abs(velocity.get()) > 0.5) {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                        }}
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