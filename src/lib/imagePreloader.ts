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
    '/images/skills/c++.jpg',
    '/images/skills/c.png',
    '/images/skills/python.png',
    '/images/skills/sw.png',
    '/images/skills/github.png',
    '/images/skills/excel.png',
    '/images/skills/SystemVerilog.svg',
    '/images/skills/Matlab_icon.png',
    '/images/skills/altium_logo.png',
    '/images/skills/acad.png',
    '/images/skills/ts.png',
    '/images/skills/React-icon.svg.png',
    '/images/skills/Next.js.png',
    '/images/skills/images.jpg',
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

// Preload a single image and return a promise
function preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => {
            console.warn(`Failed to preload image: ${src}`);
            resolve(); // Resolve anyway to not block other images
        };
        img.src = src;
    });
}

// Preload all images and return a promise that resolves when all are loaded
export async function preloadAllImages(
    images: string[] = allPreloadImages,
    onProgress?: (loaded: number, total: number) => void
): Promise<void> {
    let loaded = 0;
    const total = images.length;

    const promises = images.map(async (src) => {
        await preloadImage(src);
        loaded++;
        onProgress?.(loaded, total);
    });

    await Promise.all(promises);
}

// Cache to track which images have been preloaded
const preloadedImages = new Set<string>();

// Check if an image has been preloaded
export function isImagePreloaded(src: string): boolean {
    return preloadedImages.has(src);
}

// Mark an image as preloaded
export function markImagePreloaded(src: string): void {
    preloadedImages.add(src);
}

// Preload images and track them in the cache
export async function preloadAndCacheImages(
    images: string[] = allPreloadImages,
    onProgress?: (loaded: number, total: number) => void
): Promise<void> {
    let loaded = 0;
    const total = images.length;

    const promises = images.map(async (src) => {
        if (!preloadedImages.has(src)) {
            await preloadImage(src);
            preloadedImages.add(src);
        }
        loaded++;
        onProgress?.(loaded, total);
    });

    await Promise.all(promises);
}
