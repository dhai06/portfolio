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

// Utility to wrap a number between a min and max range
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function MovieRail() {
    // We only need 2 sets for this technique if the wrap logic is perfect, 
    // but 3 sets (original + 2 copies) is safer for wide screens to avoid flickering edges.
    const endlessMovies = [...movies, ...movies, ...movies];

    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [oneSetWidth, setOneSetWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef(0);

    // This value tracks the "absolute" scroll position (can go to +/- infinity)
    const baseX = useMotionValue(0);

    // Auto-scroll speed
    const baseVelocity = -0.5;

    // Measure the width of one set of movies
    useEffect(() => {
        if (!containerRef.current) return;
        const firstMovie = containerRef.current.querySelector('.movie-item');

        if (firstMovie) {
            // Calculate width: Element width + gap (16px / 1rem)
            const movieWidth = firstMovie.clientWidth;
            const gap = 16;
            const totalWidth = (movieWidth + gap) * movies.length;
            setOneSetWidth(totalWidth);
        }
    }, []);

    // The "Main Loop"
    useAnimationFrame((t, delta) => {
        if (!oneSetWidth || isPaused) return;

        // Move baseX by velocity
        const moveBy = baseVelocity * (delta / 16); // Normalized delta
        baseX.set(baseX.get() + moveBy);
    });

    // Transform the infinite baseX into a looping visual position
    // We wrap between -oneSetWidth and 0. This works because we have 3 copies.
    // When it scrolls past -oneSetWidth, it snaps back to 0 instantly.
    const x = useTransform(baseX, (v) => {
        if (!oneSetWidth) return 0;
        return wrap(-oneSetWidth, 0, v);
    });

    return (
        <div className="relative w-full overflow-hidden py-8">
            {/* Left/Right Fade Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <motion.div
                ref={containerRef}
                className="flex gap-4 px-16 md:px-24 w-max cursor-grab active:cursor-grabbing"
                style={{ x, touchAction: 'pan-y' }} // Bind the transformed X value, enable touch on mobile
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                // We use onPan instead of drag. 
                // onPan gives us the delta (movement) which we just add to our infinite number.
                onPanStart={(e, info) => {
                    dragStartX.current = info.point.x;
                    setIsDragging(false);
                }}
                onPan={(e, info) => {
                    baseX.set(baseX.get() + info.delta.x);
                    // If the user has dragged more than 5px, mark it as a drag
                    const dragDistance = Math.abs(info.point.x - dragStartX.current);
                    if (dragDistance > 5) {
                        setIsDragging(true);
                    }
                }}
                onPanEnd={() => {
                    // Reset isDragging after a short delay to prevent click events
                    setTimeout(() => setIsDragging(false), 100);
                }}
            >
                {endlessMovies.map((movie, index) => (
                    <motion.div
                        key={`${movie.title}-${index}`}
                        className="relative flex-shrink-0 movie-item"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => {
                            // Prevent opening details if user was dragging
                            if (isDragging) {
                                e.preventDefault();
                                e.stopPropagation();
                                return;
                            }
                            // Add your onClick handler here to open details modal
                            // For example: onMovieClick?.(movie);
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