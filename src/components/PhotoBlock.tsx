'use client';

'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface PhotoBlockProps {
    src: string;
    alt: string;
    onLike?: () => void;
}

export default function PhotoBlock({ src, alt, onLike }: PhotoBlockProps) {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
        onLike?.();
    };

    return (
        <div className="relative w-full aspect-[4/5] bg-[var(--border)] rounded-xl overflow-hidden">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                priority
            />
            {/* Like button overlay */}
            <button
                onClick={handleClick}
                className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-[var(--border)] hover:scale-105 transition-transform"
                aria-label="Like"
            >
                <motion.div
                    animate={{ scale: liked ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Heart
                        className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'text-[var(--foreground)]'}`}
                    />
                </motion.div>
            </button>
        </div>
    );
}
