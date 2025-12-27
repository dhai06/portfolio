'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PromptData } from '@/data/portfolioData';

interface SideBySideBlockProps {
    imageSrc: string;
    imageAlt: string;
    prompt: PromptData;
    onLike?: () => void;
}

export default function SideBySideBlock({ imageSrc, imageAlt, prompt, onLike }: SideBySideBlockProps) {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
        onLike?.();
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* Image Block */}
            <div className="relative w-full aspect-[4/5] bg-[var(--border)] rounded-xl overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Text Block */}
            <div className="relative bg-white p-6 border border-[var(--border)] rounded-xl flex flex-col justify-center">
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
        </div>
    );
}
