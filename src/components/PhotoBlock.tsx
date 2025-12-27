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
        <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden group">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                priority
            />
            {/* Like button overlay */}
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
