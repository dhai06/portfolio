// Timing constants (in milliseconds)
export const TIMING = {
    // Interest rotation interval
    INTEREST_ROTATION: 2500,
    // Spotify API refresh interval
    SPOTIFY_REFRESH: 30000,
    // Weather API refresh interval
    WEATHER_REFRESH: 600000, // 10 minutes
    // Time update interval
    TIME_UPDATE: 60000,
    // Carousel velocity scale factor
    VELOCITY_SCALE: 0.05,
    // Heart animation duration
    HEART_ANIMATION_DURATION: 0.35,
    // Drag state clear delay
    DRAG_CLEAR_DELAY: 150,
    // Stagger animation threshold (ms from mount)
    STAGGER_THRESHOLD: 500,
} as const;

// Carousel configuration
export const CAROUSEL = {
    // Default crawl speed (pixels per frame)
    BASE_VELOCITY: -0.5,
    // Friction coefficient (0.9 to 0.99)
    FRICTION: 0.95,
    // Velocity threshold for snapping to zero
    VELOCITY_THRESHOLD: 0.1,
    // Velocity threshold for click prevention
    CLICK_VELOCITY_THRESHOLD: 0.5,
    // Drag distance threshold for drag detection
    DRAG_DISTANCE_THRESHOLD: 5,
    // Gap between items (pixels)
    ITEM_GAP: 16,
} as const;

// Animation spring configurations
export const SPRING = {
    // Default spring for modal and content animations
    DEFAULT: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
    },
    // Bouncy spring for stagger animations
    BOUNCY: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 25,
    },
    // Modal spring
    MODAL: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 200,
    },
    // Slide transition spring
    SLIDE: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
    },
} as const;

// Animation delays
export const DELAYS = {
    // Stagger delay between items
    STAGGER: 0.1,
    // Delay before children start animating
    CHILDREN_DELAY: 0.1,
    // About block content delay
    ABOUT_CONTENT_DELAY: 0.15,
} as const;

// Location settings
export const LOCATION = {
    TIMEZONE: 'America/Vancouver',
    DISPLAY_NAME: 'Raincouver, BC',
    TIMEZONE_LABEL: 'Pacific Time (PST)',
} as const;
