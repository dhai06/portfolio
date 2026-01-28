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
    /** Controls how the image fits its container. Defaults to 'cover' */
    objectFit?: 'cover' | 'contain';
    /** Controls the position of the image within its container. Defaults to 'center' */
    objectPosition?: string;
}

// Content type for prompts - replaces string-based detection
export type PromptContentType =
    | 'text'           // Default text response
    | 'artist'         // Shows ArtistCarousel
    | 'movie'          // Shows MovieRail
    | 'skills'         // Shows SkillsRail
    | 'intro'          // About intro block (skip in PromptBlock)
    | 'contact';       // Shows text with SocialLinks

// Prompt item with kind discriminator and content type
export interface PromptItem extends BaseItem {
    kind: 'prompt';
    question: string;
    answer: string;
    contentType?: PromptContentType;
}

// Union type for feed items (legacy - use FeedBlock for new code)
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

// Paired block for alternating image/prompt layouts (like about me intro)
// The paired block has shared id, likeSummary, and details - clicking either part opens the same modal
export interface PairedBlock {
    kind: 'paired';
    id: string;
    likeSummary: string;
    details?: ItemDetails;
    image: Omit<ImageItem, 'id' | 'likeSummary' | 'details'>;
    prompt: Omit<PromptItem, 'id' | 'likeSummary' | 'details'>;
    layout: 'image-left' | 'image-right'; // image-left = image on left, prompt on right; image-right = image on right, prompt on left
}

// Feed block can be a single image, single prompt, or a paired block
export type FeedBlock = ImageItem | PromptItem | PairedBlock;

// Type guard for paired blocks
export function isPairedBlock(block: FeedBlock): block is PairedBlock {
    return block.kind === 'paired';
}

// Card data type (profile)
export interface CardData {
    id: string;
    type: 'about' | 'project' | 'contact';
    name: string;
    blocks: FeedBlock[];
    infoPills?: InfoPill[];
    details?: {
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
