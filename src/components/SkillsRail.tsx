'use client';

import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { skillImages } from '@/lib/imagePreloader';

const skills = [
    { name: 'C++', icon: skillImages[0] },
    { name: 'C', icon: skillImages[1] },
    { name: 'Python', icon: skillImages[2] },
    { name: 'SolidWorks', icon: skillImages[3] },
    { name: 'GitHub', icon: skillImages[4] },
    { name: 'Excel', icon: skillImages[5] },
    { name: 'SystemVerilog', icon: skillImages[6] },
    { name: 'MATLAB', icon: skillImages[7] },
    { name: 'Altium', icon: skillImages[8] },
    { name: 'AutoCAD', icon: skillImages[9] },
    { name: 'TypeScript', icon: skillImages[10] },
    { name: 'React', icon: skillImages[11] },
    { name: 'Next.js', icon: skillImages[12] },
    { name: 'RISC-V', icon: skillImages[13] },
    { name: 'Jira', icon: skillImages[14] },
];

const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function SkillsRail() {
    // Create 3 sets - we'll start at the middle one for buffer on both sides
    const endlessSkills = [...skills, ...skills, ...skills];
    const containerRef = useRef<HTMLDivElement>(null);
    const [oneSetWidth, setOneSetWidth] = useState(0);

    // Use refs instead of state to avoid re-renders and timing issues
    const isDraggingRef = useRef(false);
    const hasDraggedRef = useRef(false);

    // Core Motion Values
    const baseX = useMotionValue(0);
    const velocity = useMotionValue(0);

    // Configuration
    const baseVelocity = -0.5; // Default crawl speed
    const friction = 0.95;     // How quickly it slows down (0.9 to 0.99)

    useEffect(() => {
        if (!containerRef.current) return;
        const firstSkill = containerRef.current.querySelector('.skill-item');
        if (firstSkill) {
            const totalWidth = (firstSkill.clientWidth + 16) * skills.length;
            setOneSetWidth(totalWidth);
            // Start at the middle set to have buffer on both sides
            baseX.set(-totalWidth);
        }
    }, [baseX]);

    useAnimationFrame((t, delta) => {
        if (!oneSetWidth) return;

        // Don't apply automatic animation while dragging
        if (isDraggingRef.current) return;

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
                    isDraggingRef.current = true;
                    hasDraggedRef.current = false;
                }}
                onPan={(e, info) => {
                    // Track that an actual drag occurred
                    if (Math.abs(info.offset.x) > 5) {
                        hasDraggedRef.current = true;
                    }
                    // Only update position during drag, NOT velocity
                    baseX.set(baseX.get() + info.delta.x);
                }}
                onPanEnd={(e, info) => {
                    isDraggingRef.current = false;
                    // Set velocity only on release for seamless transition
                    const finalVelocity = info.velocity.x * 0.05;
                    velocity.set(finalVelocity);

                    // Clear hasDragged after a delay
                    setTimeout(() => {
                        hasDraggedRef.current = false;
                    }, 150);
                }}
            >
                {endlessSkills.map((skill, index) => (
                    <motion.div
                        key={`${skill.name}-${index}`}
                        className="relative flex-shrink-0 skill-item"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        onPointerDown={() => {
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
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shadow-lg select-none bg-gray-50 flex items-center justify-center p-2">
                            <Image
                                src={skill.icon}
                                alt={skill.name}
                                fill
                                className="object-contain pointer-events-none p-2"
                                sizes="(max-width: 768px) 80px, 96px"
                                draggable={false}
                                priority
                                loading="eager"
                            />
                        </div>
                        <p className="text-center text-xs md:text-sm font-medium text-gray-600 mt-2 select-none">
                            {skill.name}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
