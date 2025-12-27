'use client';

import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PromptData } from '@/data/portfolioData';
import TypewriterText from './TypewriterText';

interface PromptBlockProps {
    prompt: PromptData;
    onLike?: () => void;
}

export default function PromptBlock({ prompt, onLike }: PromptBlockProps) {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
        onLike?.();
    };

    return (
        <div className="relative bg-white p-8 pb-20 rounded-3xl my-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <p className="text-xs uppercase font-bold tracking-widest text-[var(--foreground)]/50 mb-3">{prompt.question}</p>
            <p className="text-xl md:text-3xl font-serif font-bold text-[var(--foreground)] leading-tight break-words">
                <TypewriterText text={prompt.answer} />
            </p>
            {/* Like button */}
            <button
                onClick={handleClick}
                className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100 hover:shadow-xl hover:bg-red-50 transition-all"
                aria-label="Like"
            >
                <motion.div
                    animate={{ scale: liked ? [1, 1.4, 1] : 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                >
                    <Heart
                        className={`w-6 h-6 transition-colors duration-200 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    />
                </motion.div>
            </button>
        </div>
    );
}
