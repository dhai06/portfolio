// Discriminated union types for portfolio items

export interface ItemDetails {
    title: string;
    description: string;
    tags?: string[];
    relatedLinks?: { label: string; url: string }[];
    media?: {
        type: 'images' | 'text' | 'video';
        images?: string[];
        text?: string;
        videoUrl?: string;
    };
}

// Base interface for all items
interface BaseItem {
    id: string;
    likeSummary: string;
    details?: ItemDetails;
}

// Image item with kind discriminator
export interface ImageItem extends BaseItem {
    kind: 'image';
    src: string;
}

// Content type for prompts - replaces string-based detection
export type PromptContentType =
    | 'text'           // Default text response
    | 'artist'         // Shows ArtistCarousel
    | 'movie'          // Shows MovieRail
    | 'skills'         // Shows SkillsRail
    | 'intro';         // About intro block (skip in PromptBlock)

// Prompt item with kind discriminator and content type
export interface PromptItem extends BaseItem {
    kind: 'prompt';
    question: string;
    answer: string;
    contentType?: PromptContentType;
}

// Union type for feed items
export type FeedItem = ImageItem | PromptItem;

// Type guards
export function isImageItem(item: FeedItem): item is ImageItem {
    return item.kind === 'image';
}

export function isPromptItem(item: FeedItem): item is PromptItem {
    return item.kind === 'prompt';
}

// Info pill type
export interface InfoPill {
    icon?: string;
    label: string;
}

// Interest data type
export interface Interest {
    name: string;
    emoji: string;
}

// Skill data type
export interface Skill {
    name: string;
    icon: string;
}

// Movie/Show data type
export interface Movie {
    title: string;
    poster: string;
}

// Artist data type
export interface Artist {
    name: string;
    image: string;
}

// Spotify data type
export interface SpotifyData {
    isPlaying: boolean;
    title: string;
    artist: string;
    albumImageUrl: string;
    songUrl: string;
}

// Weather data type
export type WeatherCondition =
    | 'clear'
    | 'cloudy'
    | 'partly-cloudy'
    | 'rainy'
    | 'snowy'
    | 'stormy';

export interface WeatherData {
    condition: WeatherCondition;
    isDay: boolean;
}

// Card data type (profile)
export interface CardData {
    id: string;
    type: 'about' | 'project' | 'contact';
    name: string;
    verified?: boolean;
    images: ImageItem[];
    prompts: PromptItem[];
    infoPills: InfoPill[];
    details: {
        stack?: string[];
        github?: string;
        demo?: string;
        email?: string;
        socials?: { label: string; url: string }[];
    };
}

// Legacy type exports for backward compatibility during migration
// These match the old portfolioData.ts interface names
export type { ImageItem as LegacyImageItem };
export type { PromptItem as PromptData };
