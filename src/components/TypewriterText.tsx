'use client';

import { motion } from 'framer-motion';

interface TypewriterTextProps {
    text: string;
    className?: string;
}

export default function TypewriterText({ text, className = '' }: TypewriterTextProps) {
    const characters = text.split('');

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
            className={className}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
        >
            {characters.map((char, index) => (
                <motion.span key={index} variants={characterVariants}>
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.span>
    );
}
