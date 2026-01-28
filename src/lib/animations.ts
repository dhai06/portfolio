import { Variants } from 'framer-motion';
import { TIMING, SPRING, DELAYS } from './constants';

// Slide animation variants for page transitions
export const slideVariants: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
};

// Container variants for staggered children
export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: DELAYS.STAGGER,
            delayChildren: DELAYS.CHILDREN_DELAY,
        }
    }
};

// Item variants for staggered animations
export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            bounce: 0.4,
            duration: 0.8
        }
    }
};

// Modal backdrop variants
export const modalBackdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
};

// Modal content variants
export const modalContentVariants: Variants = {
    hidden: { scale: 0.9, y: 50, opacity: 0 },
    visible: {
        scale: 1,
        y: 0,
        opacity: 1,
        transition: SPRING.MODAL
    },
    exit: { scale: 0.9, y: 50, opacity: 0 }
};

// Zoom lightbox variants
export const zoomVariants: Variants = {
    hidden: { scale: 0.8 },
    visible: { scale: 1 },
    exit: { scale: 0.8 }
};

// Interest pill slide animation
export const interestPillVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
};

// Heart button scale animation configuration
export const heartScaleAnimation = {
    animate: (isLiked: boolean) => ({
        scale: isLiked ? [1, 1.4, 1] : 1
    }),
    transition: {
        duration: TIMING.HEART_ANIMATION_DURATION,
        ease: 'easeOut' as const
    }
};

// Scroll block animation configuration
export const scrollBlockAnimation = {
    initial: { opacity: 0, y: 60, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    transition: SPRING.DEFAULT
};

// About block staggered entry
export const aboutBlockVariants = {
    initial: { opacity: 0, y: 40, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: SPRING.DEFAULT
};

// Hint tooltip animation
export const hintVariants: Variants = {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 5 }
};

// Carousel item hover animation
export const carouselItemHover = {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.2 }
};
