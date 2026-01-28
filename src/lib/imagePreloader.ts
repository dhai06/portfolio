'use client';

// All images that need to be preloaded for smooth animations
export const artistImages = [
    '/images/favourite artists/0x1900-000000-80-0-0 (1).jpg',
    '/images/favourite artists/0x1900-000000-80-0-0.jpg',
    '/images/favourite artists/5d2cfd9f2b02809c420d2386cccbe0da.1000x1000x1.png',
    '/images/favourite artists/Cover_of_The_Black_Skirts\'s_album_Team_Baby.png',
    '/images/favourite artists/Eric_Chou_The_Chaos_After_You_album_artwork.jpg',
    '/images/favourite artists/GD00068962.default.1.jpg',
    '/images/favourite artists/Legend,_album_cover,_March_2019.jpg',
    '/images/favourite artists/ab67616d0000b2733138f891f3075c9c5d944037.jpg',
    '/images/favourite artists/ab67616d0000b273c091fe6573f073f2e31b249f.jpg',
    '/images/favourite artists/https___images.genius.com_662eb5996444b8308d9368f9794c7a26.1000x1000x1.png',
    '/images/favourite artists/images.jpg',
];

export const skillImages = [
    '/images/skills/c++.svg',
    '/images/skills/c.svg',
    '/images/skills/python.svg',
    '/images/skills/solidworks-logo-1.svg',
    '/images/skills/github.svg',
    '/images/skills/excel.png',
    '/images/skills/SystemVerilog.svg',
    '/images/skills/Matlab_icon.png',
    '/images/skills/altium_logo.png',
    '/images/skills/acad.png',
    '/images/skills/ts.png',
    '/images/skills/React-icon.svg.png',
    '/images/skills/Next.js.png',
    '/images/skills/RISC-V-logo-square.svg.avif',
    '/images/skills/Jira_Logo.svg.png',
];

export const movieImages = [
    '/images/movies-shows/Howls-moving-castleposter.jpg',
    '/images/movies-shows/MV5BMjA4NzYxNWItZWJmNi00ODE2LTgwZDgtMzBkN2MzOGZhNDEzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    '/images/movies-shows/MV5BODI3NzUwYTktMjlkYS00MDNiLTg0MjgtNWQ1NWZkYmQ2Mzk4XkEyXkFqcGc@._V1_.jpg',
    '/images/movies-shows/MV5BYWM2NTM4MTktNDFiNi00NTI3LThiZTgtZmJiZTQ2NzdhNDE3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    '/images/movies-shows/Our_Beloved_Summer.jpg',
    '/images/movies-shows/VXzRyz_4f.jpg',
    '/images/movies-shows/When_Life_Gives_You_Tangerines_poster.png',
    '/images/movies-shows/fotb.jpg',
    '/images/movies-shows/images.jpg',
    '/images/movies-shows/p27192445_v_v8_ab.jpg',
];

// All images to preload
export const allPreloadImages = [
    ...artistImages,
    ...skillImages,
    ...movieImages,
];

// Cache to track which images have been preloaded
const preloadedImages = new Set<string>();

// Track loading state per carousel type
const carouselLoadingState = {
    artist: { loaded: false, loading: false },
    skills: { loaded: false, loading: false },
    movie: { loaded: false, loading: false },
};

// Higher concurrency for faster preloading - modern browsers handle 6+ concurrent requests well
const DEFAULT_CONCURRENCY = 8;

/**
 * Preload a single image and return a promise
 * Uses native Image constructor for fastest preloading
 */
function preloadImage(src: string): Promise<void> {
    return new Promise((resolve) => {
        // Skip if already preloaded
        if (preloadedImages.has(src)) {
            resolve();
            return;
        }

        const img = new Image();
        img.onload = () => {
            preloadedImages.add(src);
            resolve();
        };
        img.onerror = () => {
            console.warn(`Failed to preload image: ${src}`);
            resolve(); // Resolve anyway to not block other images
        };
        img.src = src;
    });
}

/**
 * Preload images with controlled concurrency to prevent network saturation
 * Based on best practice: bundle-preload (preload based on user intent)
 */
async function preloadWithConcurrency(
    images: string[],
    concurrency: number = DEFAULT_CONCURRENCY,
    onProgress?: (loaded: number, total: number) => void
): Promise<void> {
    let loaded = 0;
    const total = images.length;

    // Filter out already preloaded images
    const imagesToLoad = images.filter(src => !preloadedImages.has(src));
    
    if (imagesToLoad.length === 0) {
        onProgress?.(total, total);
        return;
    }

    // Update progress for already loaded images
    loaded = total - imagesToLoad.length;
    onProgress?.(loaded, total);

    // Create batches based on concurrency limit
    const queue = [...imagesToLoad];
    const activePromises: Promise<void>[] = [];

    const processNext = async (): Promise<void> => {
        if (queue.length === 0) return;

        const src = queue.shift()!;
        await preloadImage(src);
        loaded++;
        onProgress?.(loaded, total);

        // Process next item if queue not empty
        if (queue.length > 0) {
            return processNext();
        }
    };

    // Start initial batch of concurrent loads
    for (let i = 0; i < Math.min(concurrency, queue.length); i++) {
        activePromises.push(processNext());
    }

    await Promise.all(activePromises);
}

// Check if an image has been preloaded
export function isImagePreloaded(src: string): boolean {
    return preloadedImages.has(src);
}

// Mark an image as preloaded (for images loaded via Next.js Image)
export function markImagePreloaded(src: string): void {
    preloadedImages.add(src);
}

/**
 * Preload all carousel images with concurrency control
 * This is the main function called by ImagePreloadProvider
 */
export async function preloadAndCacheImages(
    images: string[] = allPreloadImages,
    onProgress?: (loaded: number, total: number) => void
): Promise<void> {
    await preloadWithConcurrency(images, DEFAULT_CONCURRENCY, onProgress);
}

/**
 * Preload specific carousel images on demand
 * Call this when a carousel becomes visible for the first time
 */
export async function preloadCarouselImages(
    type: 'artist' | 'skills' | 'movie'
): Promise<void> {
    const state = carouselLoadingState[type];
    
    // Skip if already loaded or currently loading
    if (state.loaded || state.loading) {
        return;
    }

    state.loading = true;

    const imageMap = {
        artist: artistImages,
        skills: skillImages,
        movie: movieImages,
    };

    await preloadWithConcurrency(imageMap[type], DEFAULT_CONCURRENCY);
    
    state.loaded = true;
    state.loading = false;
}

/**
 * Check if a specific carousel's images are loaded
 */
export function isCarouselLoaded(type: 'artist' | 'skills' | 'movie'): boolean {
    return carouselLoadingState[type].loaded;
}

// Legacy function - kept for backward compatibility
export async function preloadAllImages(
    images: string[] = allPreloadImages,
    onProgress?: (loaded: number, total: number) => void
): Promise<void> {
    await preloadWithConcurrency(images, DEFAULT_CONCURRENCY, onProgress);
}
