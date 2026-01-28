'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ZoomIn } from 'lucide-react';
import { ImageItem, PromptData, ItemDetails } from '@/data/portfolioData';
import Image from 'next/image';
import HeartButton from './ui/HeartButton';
import {
    modalBackdropVariants,
    modalContentVariants,
    zoomVariants,
} from '@/lib/animations';

// Type guard to check if item is an ImageItem
function isImageItem(item: ImageItem | PromptData): item is ImageItem {
    return 'src' in item;
}

// Helper to check if a URL is a video file
function isVideoFile(url: string): boolean {
    const videoExtensions = ['.mov', '.mp4', '.webm', '.ogg', '.avi'];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some(ext => lowerUrl.endsWith(ext));
}

interface ItemDetailsModalProps {
    item: ImageItem | PromptData;
    isLiked: boolean;
    onToggleLike: () => void;
    onClose: () => void;
}

export default function ItemDetailsModal({
    item,
    isLiked,
    onToggleLike,
    onClose,
}: ItemDetailsModalProps) {
    const details: ItemDetails | undefined = item.details;
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);

    // Close modal immediately if item has no details
    useEffect(() => {
        if (!details) {
            onClose();
        }
    }, [details, onClose]);

    // Lock body scroll when modal is open (only if we have details to show)
    useEffect(() => {
        if (!details) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [details]);

    if (!details) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                variants={modalBackdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={onClose}
            >
                <motion.div
                    className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    variants={modalContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Image preview for ImageItem */}
                    {isImageItem(item) && (
                        <div
                            className="relative w-full aspect-[16/10] rounded-t-3xl overflow-hidden cursor-zoom-in group/zoom"
                            onClick={() => setZoomedImage(item.src)}
                        >
                            <Image
                                src={item.src}
                                alt={details.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 512px"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover/zoom:bg-black/10 transition-colors flex items-center justify-center">
                                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover/zoom:opacity-100 transition-opacity" />
                            </div>
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

                        {/* Media Section */}
                        {details.media && (
                            <div className="mb-6">
                                {details.media.type === 'images' && details.media.images && (
                                    <div className="columns-2 gap-2 space-y-2">
                                        {details.media.images.map((mediaSrc, index) => (
                                            <div
                                                key={index}
                                                className={`relative rounded-xl overflow-hidden bg-gray-50 break-inside-avoid ${!isVideoFile(mediaSrc) ? 'cursor-zoom-in group/gallery' : ''}`}
                                                onClick={() => !isVideoFile(mediaSrc) && setZoomedImage(mediaSrc)}
                                            >
                                                {isVideoFile(mediaSrc) ? (
                                                    <video
                                                        src={mediaSrc}
                                                        controls
                                                        playsInline
                                                        className="w-full h-auto block rounded-xl"
                                                    >
                                                        Your browser does not support the video tag.
                                                    </video>
                                                ) : (
                                                    <>
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={mediaSrc}
                                                            alt={`${details.title} image ${index + 1}`}
                                                            loading="lazy"
                                                            className="w-full h-auto block"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover/gallery:bg-black/10 transition-colors flex items-center justify-center">
                                                            <ZoomIn className="w-6 h-6 text-gray-700 opacity-0 group-hover/gallery:opacity-100 transition-opacity" />
                                                        </div>
                                                    </>
                                                )}
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
                                    <div
                                        className="relative w-full overflow-hidden bg-gray-50 max-w-md mx-auto rounded-2xl"
                                        style={{ paddingBottom: '177.77%' }}
                                    >
                                        <iframe
                                            src={details.media.videoUrl}
                                            className="absolute top-0 left-0 w-full h-full border-0"
                                            allow="autoplay"
                                            allowFullScreen
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
                            <HeartButton
                                isLiked={isLiked}
                                onClick={onToggleLike}
                                variant="modal"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Zoom Lightbox */}
                {zoomedImage && (
                    <motion.div
                        className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                        variants={modalBackdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => setZoomedImage(null)}
                    >
                        <button
                            onClick={() => setZoomedImage(null)}
                            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
                            aria-label="Close zoom"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>
                        <motion.div
                            className="relative max-w-7xl max-h-[90vh] w-full h-full"
                            variants={zoomVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={zoomedImage}
                                alt="Zoomed image"
                                fill
                                sizes="100vw"
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
