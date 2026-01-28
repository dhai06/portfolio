'use client';

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEndlessCarousel } from '@/hooks';
import GradientEdges from '@/components/ui/GradientEdges';
import { skills } from '@/data/portfolioData';

const ITEM_SELECTOR = '.skill-item';

/**
 * SkillsRail - Endless scrolling carousel for skills
 *
 * Performance optimizations:
 * - Uses 2x array instead of 3x (30 items vs 45)
 * - First set of images are eager-loaded (preloaded by ImagePreloadProvider)
 * - GPU-accelerated transforms via will-change
 */
const SkillsRail = memo(function SkillsRail() {
    const { containerRef, x, panHandlers, itemHandlers } = useEndlessCarousel({
        itemCount: skills.length,
        itemSelector: ITEM_SELECTOR,
    });

    // Use 2x array - still provides seamless looping with fewer DOM nodes
    const endlessSkills = useMemo(() => [...skills, ...skills], []);

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
                {endlessSkills.map((skill, index) => {
                    // First set of images are eager-loaded (already preloaded)
                    const isFirstSet = index < skills.length;

                    return (
                        <div
                            key={`${skill.name}-${index}`}
                            className="relative flex-shrink-0 skill-item"
                            onPointerDown={itemHandlers.onPointerDown}
                            onClick={itemHandlers.onClick}
                        >
                            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shadow-lg select-none flex items-center justify-center p-2">
                                <Image
                                    src={skill.icon}
                                    alt={skill.name}
                                    fill
                                    className="object-contain pointer-events-none p-2"
                                    sizes="(max-width: 768px) 80px, 96px"
                                    draggable={false}
                                    loading={isFirstSet ? 'eager' : 'lazy'}
                                    priority={isFirstSet}
                                />
                            </div>
                            <p className="text-center text-xs uppercase font-bold tracking-widest text-[var(--foreground)]/50 mt-2 select-none">
                                {skill.name}
                            </p>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
});

export default SkillsRail;
