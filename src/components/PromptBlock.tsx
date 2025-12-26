'use client';

'use client';

import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PromptData } from '@/data/portfolioData';

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
        <div className="relative bg-white p-6 border-b border-[var(--border)] rounded-xl my-2">
            <p className="text-sm text-[var(--foreground)]/60 mb-2">{prompt.question}</p>
            <p className="text-xl font-serif font-semibold text-[var(--foreground)] leading-snug">
                {prompt.answer}
            </p>
            {/* Like button */}
            <button
                onClick={handleClick}
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[var(--background)] shadow-md flex items-center justify-center border border-[var(--border)] hover:scale-105 transition-transform"
                aria-label="Like"
            >
                <motion.div
                    animate={{ scale: liked ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Heart
                        className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-[var(--foreground)]'}`}
                    />
                </motion.div>
            </button>
        </div>
    );
}
