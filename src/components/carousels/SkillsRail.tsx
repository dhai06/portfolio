'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEndlessCarousel } from '@/hooks';
import { GradientEdges } from '@/components/ui';
import { carouselItemHover } from '@/lib/animations';
import { skills } from '@/data/portfolioData';
import { useImagePreload } from '@/context/ImagePreloadContext';

const ITEM_SELECTOR = '.skill-item';

// Skeleton placeholder for loading state
function SkillsRailSkeleton() {
    return (
        <div className="relative w-full overflow-hidden py-8">
            <GradientEdges />
            <div className="flex gap-4 px-16 md:px-24 w-max">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div
                        key={index}
                        className="relative flex-shrink-0 skill-item"
                    >
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shadow-lg select-none bg-gray-200 animate-pulse" />
                        <div className="h-4 w-16 mx-auto mt-2 bg-gray-200 rounded animate-pulse" />
                    </div>
                ))}
            </div>
        </div>
    );
}

// Main carousel content
function SkillsRailContent() {
    const { containerRef, x, panHandlers, itemHandlers } = useEndlessCarousel({
        itemCount: skills.length,
        itemSelector: ITEM_SELECTOR,
    });

    // Create 3 sets for endless scrolling
    const endlessSkills = [...skills, ...skills, ...skills];

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
                {endlessSkills.map((skill, index) => (
                    <motion.div
                        key={`${skill.name}-${index}`}
                        className="relative flex-shrink-0 skill-item"
                        whileHover={carouselItemHover.whileHover}
                        transition={carouselItemHover.transition}
                        onPointerDown={itemHandlers.onPointerDown}
                        onClick={itemHandlers.onClick}
                    >
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shadow-lg select-none bg-gray-50 flex items-center justify-center p-2">
                            <Image
                                src={skill.icon}
                                alt={skill.name}
                                fill
                                className="object-contain pointer-events-none p-2"
                                sizes="(max-width: 768px) 80px, 96px"
                                draggable={false}
                            />
                        </div>
                        <p className="text-center text-xs uppercase font-bold tracking-widest text-[var(--foreground)]/50 mt-2 select-none">
                            {skill.name}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default function SkillsRail() {
    const { isLoaded } = useImagePreload();

    // Show skeleton while preloading, then instantly show carousel (no animation)
    if (!isLoaded) {
        return <SkillsRailSkeleton />;
    }

    return <SkillsRailContent />;
}
