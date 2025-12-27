'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useBlockVisible } from './BlockVisibleContext';

interface TypewriterTextProps {
    text: string;
    className?: string;
    startAnimation?: boolean; // Optional external control for when to start
}

export default function TypewriterText({ text, className = '', startAnimation }: TypewriterTextProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const blockVisible = useBlockVisible(); // Get block visibility from context
    const characters = text.split('');

    // Priority: explicit startAnimation prop > block context > viewport detection
    const shouldAnimate = startAnimation !== undefined
        ? (isInView && startAnimation)
        : (isInView && blockVisible);

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.02,
            },
        },
    };

    const characterVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.1,
            },
        },
    };

    return (
        <motion.span
            ref={ref}
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
        >
            {characters.map((char, index) => (
                <motion.span key={index} variants={characterVariants}>
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.span>
    );
}
