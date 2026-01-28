'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { preloadCarouselImages, isCarouselLoaded } from '@/lib/imagePreloader';

type CarouselType = 'artist' | 'skills' | 'movie';

interface UseCarouselPreloadOptions {
    /** The type of carousel to preload */
    type: CarouselType;
    /** Whether to start preloading immediately (default: false, waits for visibility) */
    eager?: boolean;
}

interface UseCarouselPreloadReturn {
    /** Whether all images for this carousel are loaded */
    isLoaded: boolean;
    /** Whether the carousel is currently loading images */
    isLoading: boolean;
    /** Ref to attach to the carousel container for visibility detection */
    containerRef: React.RefObject<HTMLDivElement | null>;
    /** Manually trigger preloading */
    triggerPreload: () => void;
}

/**
 * Hook for managing carousel-specific image preloading
 * Based on best practice: bundle-preload (preload based on user intent)
 * 
 * Features:
 * - Uses IntersectionObserver to detect when carousel is about to be visible
 * - Triggers preloading when carousel enters viewport (or a margin before)
 * - Caches loading state to prevent duplicate preloads
 * - Supports eager loading for critical carousels
 */
export function useCarouselPreload({
    type,
    eager = false,
}: UseCarouselPreloadOptions): UseCarouselPreloadReturn {
    // Check if already loaded (from global preload or previous mount)
    const [isLoaded, setIsLoaded] = useState(() => isCarouselLoaded(type));
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const hasTriggeredPreload = useRef(false);

    const triggerPreload = useCallback(async () => {
        // Skip if already loaded or loading
        if (isLoaded || isLoading || hasTriggeredPreload.current) {
            return;
        }

        hasTriggeredPreload.current = true;
        setIsLoading(true);

        try {
            await preloadCarouselImages(type);
            setIsLoaded(true);
        } catch (error) {
            console.error(`Failed to preload ${type} carousel images:`, error);
            // Still mark as loaded to show content (will use lazy loading as fallback)
            setIsLoaded(true);
        } finally {
            setIsLoading(false);
        }
    }, [type, isLoaded, isLoading]);

    // Eager loading - trigger immediately on mount
    useEffect(() => {
        if (eager && !isLoaded) {
            triggerPreload();
        }
    }, [eager, isLoaded, triggerPreload]);

    // Visibility-based loading using IntersectionObserver
    useEffect(() => {
        // Skip if eager loading, already loaded, or no container
        if (eager || isLoaded || !containerRef.current) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    triggerPreload();
                    // Disconnect after triggering (one-time trigger)
                    observer.disconnect();
                }
            },
            {
                // Start preloading when within 200px of viewport
                rootMargin: '200px',
                threshold: 0,
            }
        );

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [eager, isLoaded, triggerPreload]);

    return {
        isLoaded,
        isLoading,
        containerRef,
        triggerPreload,
    };
}
