'use client';

import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { heartScaleAnimation } from '@/lib/animations';

type HeartButtonVariant = 'default' | 'overlay' | 'modal';

interface HeartButtonProps {
    isLiked: boolean;
    onClick: () => void;
    /** Visual variant (default: 'default') */
    variant?: HeartButtonVariant;
    /** Additional class names */
    className?: string;
    /** Show hint tooltip (only for default variant) */
    showHint?: boolean;
}

const variantStyles: Record<HeartButtonVariant, string> = {
    default: 'w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100 hover:border-red-500 active:border-red-500 hover:shadow-xl active:shadow-xl hover:bg-red-50 active:bg-red-50 transition-all duration-200',
    overlay: 'absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100 hover:border-red-500 active:border-red-500 hover:shadow-xl active:shadow-xl hover:bg-red-50 active:bg-red-50 transition-all',
    modal: 'w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100 hover:border-red-500 active:border-red-500 hover:shadow-xl active:shadow-xl hover:bg-red-50 active:bg-red-50 transition-all duration-200',
};

export default function HeartButton({
    isLiked,
    onClick,
    variant = 'default',
    className = '',
    showHint = false,
}: HeartButtonProps) {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClick();
    };

    return (
        <button
            onClick={handleClick}
            className={`group/heart ${variantStyles[variant]} ${className}`}
            aria-label={isLiked ? 'Unlike' : 'Like'}
        >
            <motion.div
                animate={heartScaleAnimation.animate(isLiked)}
                transition={heartScaleAnimation.transition}
            >
                <Heart
                    className={`w-6 h-6 transition-colors duration-200 ${
                        isLiked
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400 group-hover/heart:text-red-500 group-active/heart:text-red-500'
                    }`}
                />
            </motion.div>
        </button>
    );
}
