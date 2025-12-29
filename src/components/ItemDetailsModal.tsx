'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ExternalLink } from 'lucide-react';
import { ImageItem, PromptData, ItemDetails } from '@/data/portfolioData';
import Image from 'next/image';

// Type guard to check if item is an ImageItem
function isImageItem(item: ImageItem | PromptData): item is ImageItem {
    return 'src' in item;
}

// Convert Google Drive preview URL to direct download URL for video playback
function getDriveDirectLink(url: string) {
    return url.replace('/file/d/', '/uc?export=download&id=').replace('/preview', '');
}

interface ItemDetailsModalProps {
    item: ImageItem | PromptData;
    isLiked: boolean;
    onToggleLike: () => void;
    onClose: () => void;
}

export default function ItemDetailsModal({ item, isLiked, onToggleLike, onClose }: ItemDetailsModalProps) {
    const details: ItemDetails | undefined = item.details;

    // Lock body scroll when modal is open
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    if (!details) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    initial={{ scale: 0.9, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 50, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Image preview for ImageItem */}
                    {isImageItem(item) && (
                        <div className="relative w-full aspect-[16/10] rounded-t-3xl overflow-hidden">
                            <Image
                                src={item.src}
                                alt={details.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-serif font-bold text-[var(--foreground)] mb-2">
                                    {details.title}
                                </h2>
                                {/* Tags */}
                                {details.tags && details.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {details.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-[var(--foreground)]/70"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-200 transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5 text-[var(--foreground)]" />
                            </button>
                        </div>

                        {/* Description */}
                        <p className="text-base text-[var(--foreground)]/80 leading-relaxed mb-6">
                            {details.description}
                        </p>

                        {/* Customizable Media Section */}
                        {details.media && (
                            <div className="mb-6">
                                {details.media.type === 'images' && details.media.images && (
                                    <div className="grid grid-cols-2 gap-2">
                                        {details.media.images.map((imgSrc, index) => (
                                            <div
                                                key={index}
                                                className="relative rounded-xl overflow-hidden bg-gray-50"
                                            >
                                                <Image
                                                    src={imgSrc}
                                                    alt={`${details.title} image ${index + 1}`}
                                                    width={300}
                                                    height={300}
                                                    className="w-full h-auto object-contain"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {details.media.type === 'text' && details.media.text && (
                                    <div className="bg-gray-50 rounded-2xl p-4">
                                        <p className="text-lg font-serif text-[var(--foreground)]">
                                            {details.media.text}
                                        </p>
                                    </div>
                                )}
                                {details.media.type === 'video' && details.media.videoUrl && (
                                    <div className="relative rounded-2xl overflow-hidden bg-gray-50 w-full aspect-[9/16] max-w-md mx-auto">
                                        <video
                                            src={getDriveDirectLink(details.media.videoUrl)}
                                            className="w-full h-full object-cover"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            controls
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Related Links */}
                        {details.relatedLinks && details.relatedLinks.length > 0 && (
                            <div className="mb-6">
                                <p className="text-xs uppercase font-bold tracking-widest text-[var(--foreground)]/50 mb-3">
                                    Related Links
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {details.relatedLinks.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-[var(--foreground)] text-white rounded-full text-sm font-medium hover:opacity-90 active:opacity-90 transition-opacity"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Like Button */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-sm text-[var(--foreground)]/60">
                                {isLiked ? 'You liked this!' : 'Like this item'}
                            </span>
                            <button
                                onClick={onToggleLike}
                                className="group/heart w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100 hover:border-red-500 active:border-red-500 hover:shadow-xl active:shadow-xl hover:bg-red-50 active:bg-red-50 transition-all duration-200"
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
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
