'use client';

import { useRef, useState, useEffect, RefObject } from 'react';
import { useAnimationFrame, useMotionValue, useTransform, MotionValue, PanInfo } from 'framer-motion';
import { CAROUSEL, TIMING } from '@/lib/constants';

// Wrap function for seamless looping
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface UseEndlessCarouselOptions {
    /** Number of items in one set (before duplication) */
    itemCount: number;
    /** CSS selector for measuring item width (e.g., '.movie-item') */
    itemSelector: string;
    /** Number of times the item array is repeated (default: 2) */
    setCount?: number;
    /** Custom base velocity (default: CAROUSEL.BASE_VELOCITY) */
    baseVelocity?: number;
    /** Custom friction (default: CAROUSEL.FRICTION) */
    friction?: number;
}

interface UseEndlessCarouselReturn {
    /** Ref to attach to the container element */
    containerRef: RefObject<HTMLDivElement | null>;
    /** Transformed x position for seamless wrapping */
    x: MotionValue<number>;
    /** Event handlers for pan gestures */
    panHandlers: {
        onClick: (e: React.MouseEvent) => void;
        onPanStart: () => void;
        onPan: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
        onPanEnd: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
    };
    /** Item-level event handlers */
    itemHandlers: {
        onPointerDown: () => void;
        onClick: (e: React.MouseEvent) => void;
    };
    /** Current velocity value (for click prevention) */
    velocity: MotionValue<number>;
    /** Whether currently dragging */
    isDragging: boolean;
}

export function useEndlessCarousel({
    itemCount,
    itemSelector,
    setCount = 2,
    baseVelocity = CAROUSEL.BASE_VELOCITY,
    friction = CAROUSEL.FRICTION,
}: UseEndlessCarouselOptions): UseEndlessCarouselReturn {
    const containerRef = useRef<HTMLDivElement>(null);
    const [oneSetWidth, setOneSetWidth] = useState(0);

    // Refs to avoid re-renders and timing issues
    const isDraggingRef = useRef(false);
    const hasDraggedRef = useRef(false);

    // Core motion values
    const baseX = useMotionValue(0);
    const velocity = useMotionValue(0);

    // Measure item width and initialize position
    useEffect(() => {
        if (!containerRef.current) return;
        const firstItem = containerRef.current.querySelector(itemSelector);
        if (firstItem) {
            const totalWidth = (firstItem.clientWidth + CAROUSEL.ITEM_GAP) * itemCount;
            setOneSetWidth(totalWidth);
            // For 2 sets: start at -oneSetWidth/2 to center the view
            // For 3 sets: start at -oneSetWidth (middle set)
            const startPosition = setCount === 2 ? -totalWidth / 2 : -totalWidth;
            baseX.set(startPosition);
        }
    }, [baseX, itemCount, itemSelector, setCount]);

    // Animation frame for auto-scroll and momentum
    useAnimationFrame((t, delta) => {
        if (!oneSetWidth) return;
        if (isDraggingRef.current) return;

        let currentVelocity = velocity.get();

        // Apply friction
        currentVelocity *= friction;

        // Snap to zero if velocity is very small
        if (Math.abs(currentVelocity) < CAROUSEL.VELOCITY_THRESHOLD) {
            currentVelocity = 0;
        }
        velocity.set(currentVelocity);

        // Movement: base crawl + momentum
        const moveBy = (baseVelocity + currentVelocity) * (delta / 16);
        baseX.set(baseX.get() + moveBy);
    });

    // Transform for seamless wrapping
    const x = useTransform(baseX, (v) => {
        if (!oneSetWidth) return 0;
        // For 2 sets: wrap between -oneSetWidth and 0
        // For 3 sets: wrap between -2*oneSetWidth and -oneSetWidth
        const wrapMin = setCount === 2 ? -oneSetWidth : -2 * oneSetWidth;
        const wrapMax = setCount === 2 ? 0 : -oneSetWidth;
        return wrap(wrapMin, wrapMax, v);
    });

    // Pan handlers for container
    const panHandlers = {
        onClick: (e: React.MouseEvent) => {
            // Stop propagation if dragged or moving fast
            if (hasDraggedRef.current || Math.abs(velocity.get()) > CAROUSEL.CLICK_VELOCITY_THRESHOLD) {
                e.stopPropagation();
                e.preventDefault();
            }
        },
        onPanStart: () => {
            isDraggingRef.current = true;
            hasDraggedRef.current = false;
        },
        onPan: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
            // Track that an actual drag occurred
            if (Math.abs(info.offset.x) > CAROUSEL.DRAG_DISTANCE_THRESHOLD) {
                hasDraggedRef.current = true;
            }
            // Update position during drag
            baseX.set(baseX.get() + info.delta.x);
        },
        onPanEnd: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
            isDraggingRef.current = false;
            // Set velocity on release for momentum
            const finalVelocity = info.velocity.x * TIMING.VELOCITY_SCALE;
            velocity.set(finalVelocity);

            // Clear drag flag after delay
            setTimeout(() => {
                hasDraggedRef.current = false;
            }, TIMING.DRAG_CLEAR_DELAY);
        },
    };

    // Item-level handlers
    const itemHandlers = {
        onPointerDown: () => {
            hasDraggedRef.current = false;
        },
        onClick: (e: React.MouseEvent) => {
            // Prevent click if dragged or velocity is high
            if (hasDraggedRef.current || Math.abs(velocity.get()) > CAROUSEL.CLICK_VELOCITY_THRESHOLD) {
                e.preventDefault();
                e.stopPropagation();
            }
        },
    };

    return {
        containerRef,
        x,
        panHandlers,
        itemHandlers,
        velocity,
        isDragging: isDraggingRef.current,
    };
}
