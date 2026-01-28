'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import TypewriterText from './TypewriterText';
import { HeartButton } from './ui';
import { LocationTimeWidget, SpotifyWidget, InterestsPill, SocialLinks } from './about';
import { aboutBlockVariants, hintVariants } from '@/lib/animations';
import { DELAYS, SPRING } from '@/lib/constants';

interface AboutIntroBlockProps {
    imageSrc: string;
    imageAlt: string;
    isLiked: boolean;
    onHeartClick: () => void;
    onBlockClick?: () => void;
}

export default function AboutIntroBlock({
    imageSrc,
    imageAlt,
    isLiked,
    onHeartClick,
    onBlockClick,
}: AboutIntroBlockProps) {
    // Hint state - show immediately, hide after first heart press
    const [showHint, setShowHint] = useState(true);

    useEffect(() => {
        if (isLiked) {
            setShowHint(false);
        }
    }, [isLiked]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
            {/* Image Block - 2 columns, portrait aspect ratio */}
            <motion.div
                className="md:col-span-2 relative h-full min-h-[400px] bg-gray-100 rounded-[2rem] overflow-hidden group cursor-pointer"
                onClick={onBlockClick}
                initial={aboutBlockVariants.initial}
                animate={aboutBlockVariants.animate}
                transition={{
                    delay: 0,
                    ...SPRING.DEFAULT,
                }}
                style={{ willChange: 'transform, opacity' }}
            >
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    priority
                    loading="eager"
                />
            </motion.div>

            {/* Content Block - 3 columns */}
            <motion.div
                className="md:col-span-3 relative bg-white rounded-[2rem] p-6 md:p-8 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden cursor-pointer"
                onClick={onBlockClick}
                initial={aboutBlockVariants.initial}
                animate={aboutBlockVariants.animate}
                transition={{
                    delay: DELAYS.ABOUT_CONTENT_DELAY,
                    ...SPRING.DEFAULT,
                }}
                style={{ willChange: 'transform, opacity' }}
            >
                {/* Two-column layout for desktop */}
                <div className="relative z-10 flex flex-col md:flex-row gap-6 flex-1">
                    {/* Left Side - Main Content (~65%) */}
                    <div className="flex-1 md:w-[65%] h-full flex flex-col justify-between gap-6">
                        {/* Greeting */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--foreground)] leading-tight mb-2 break-words w-full">
                                <TypewriterText text="Hi, I'm Daniel" />
                            </h2>
                            <p className="text-base font-medium text-[var(--foreground)]/50 flex items-center gap-1 whitespace-normal">
                                Electrical Engineering Student
                            </p>
                        </div>

                        {/* Education & Experience Pills */}
                        <div className="flex flex-wrap gap-3">
                            {/* UBC Pill */}
                            <div className="w-full sm:flex-1 min-w-0 flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl">
                                <div className="relative w-7 h-7 flex-shrink-0">
                                    <Image
                                        src="/images/ubc-logo.png"
                                        alt="UBC Logo"
                                        fill
                                        sizes="28px"
                                        className="object-contain"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-semibold text-[var(--foreground)] leading-tight break-words">
                                        Electrical Engineering
                                    </span>
                                    <span className="text-xs text-[var(--foreground)]/60 break-words">
                                        University of British Columbia
                                    </span>
                                </div>
                            </div>

                            {/* Formula UBC Pill */}
                            <div className="w-full sm:flex-1 min-w-0 flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl">
                                <div className="relative w-7 h-7 flex-shrink-0">
                                    <Image
                                        src="/images/formula-ubc-logo.png"
                                        alt="Formula UBC Logo"
                                        fill
                                        sizes="28px"
                                        className="object-contain"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-semibold text-[var(--foreground)] leading-tight break-words">
                                        Formula UBC
                                    </span>
                                    <span className="text-xs text-[var(--foreground)]/60 break-words">
                                        Aerodynamics
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Interests */}
                        <InterestsPill />
                    </div>

                    {/* Right Side - Widgets (~35%) */}
                    <div className="md:w-[35%] flex flex-col gap-4">
                        <LocationTimeWidget />
                        <SpotifyWidget />
                    </div>
                </div>

                {/* Social Links & Heart Button */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-4 pt-4 mt-6 border-t border-gray-100">
                    <SocialLinks />
                    <div className="flex-1" />

                    <div className="relative group/heart flex items-center">
                        <AnimatePresence>
                            {showHint && !isLiked && (
                                <motion.div
                                    variants={hintVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="absolute right-full mr-3 whitespace-nowrap z-10 pointer-events-none"
                                >
                                    <div className="bg-black text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-xl relative">
                                        press this :)
                                        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-black transform rotate-45" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <HeartButton
                            isLiked={isLiked}
                            onClick={onHeartClick}
                            className="relative z-10"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
