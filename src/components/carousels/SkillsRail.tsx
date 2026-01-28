'use client';

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEndlessCarousel } from '@/hooks';
import { GradientEdges } from '@/components/ui';
import { skills } from '@/data/portfolioData';

const ITEM_SELECTOR = '.skill-item';

/**
 * SkillsRail - Endless scrolling carousel for skills
 * Renders immediately with lazy-loaded images (no skeleton swap)
 */
const SkillsRail = memo(function SkillsRail() {
    const { containerRef, x, panHandlers, itemHandlers } = useEndlessCarousel({
        itemCount: skills.length,
        itemSelector: ITEM_SELECTOR,
    });

    // Memoize the tripled array to prevent recreation
    const endlessSkills = useMemo(() => [...skills, ...skills, ...skills], []);

    return (
        <div className="relative w-full overflow-x-clip overflow-y-visible py-8">
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
                    <div
                        key={`${skill.name}-${index}`}
                        className="relative flex-shrink-0 skill-item transition-transform duration-200 hover:scale-105"
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
                                loading="lazy"
                            />
                        </div>
                        <p className="text-center text-xs uppercase font-bold tracking-widest text-[var(--foreground)]/50 mt-2 select-none">
                            {skill.name}
                        </p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
});

export default SkillsRail;
