'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface PhotoBlockProps {
    src: string;
    alt: string;
    isLiked: boolean;
    onHeartClick: () => void;
    onBlockClick?: () => void;
}

export default function PhotoBlock({ src, alt, isLiked, onHeartClick, onBlockClick }: PhotoBlockProps) {
    return (
        <div
            className="relative w-full aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden group cursor-pointer"
            onClick={onBlockClick}
        >
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                priority
            />
            {/* Like button overlay */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onHeartClick();
                }}
                className="group/heart absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100 hover:border-red-500 active:border-red-500 hover:shadow-xl active:shadow-xl hover:bg-red-50 active:bg-red-50 transition-all"
                aria-label="Like"
            >
                <motion.div
                    animate={{ scale: isLiked ? [1, 1.4, 1] : 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                >
                    <Heart
                        className={`w-6 h-6 transition-colors duration-200 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/heart:text-red-500 group-active/heart:text-red-500'}`}
                    />
                </motion.div>
            </button>
        </div>
    );
}

