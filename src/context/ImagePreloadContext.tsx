'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { preloadAndCacheImages, allPreloadImages } from '@/lib/imagePreloader';

interface ImagePreloadContextType {
    isLoaded: boolean;
    progress: number;
}

const ImagePreloadContext = createContext<ImagePreloadContextType>({
    isLoaded: false,
    progress: 0,
});

export function useImagePreload() {
    return useContext(ImagePreloadContext);
}

interface ImagePreloadProviderProps {
    children: ReactNode;
}

export function ImagePreloadProvider({ children }: ImagePreloadProviderProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Start preloading images immediately on mount
        preloadAndCacheImages(allPreloadImages, (loaded, total) => {
            setProgress(Math.round((loaded / total) * 100));
        }).then(() => {
            setIsLoaded(true);
        });
    }, []);

    return (
        <ImagePreloadContext.Provider value={{ isLoaded, progress }}>
            {children}
        </ImagePreloadContext.Provider>
    );
}
