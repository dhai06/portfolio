'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { TIMING, SPRING } from '@/lib/constants';
import { interests } from '@/data/portfolioData';

export default function InterestsPill() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % interests.length);
        }, TIMING.INTEREST_ROTATION);

        return () => clearInterval(interval);
    }, []);

    const currentInterest = interests[currentIndex];

    return (
        <div className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-4 gap-y-2">
            <span className="text-base font-medium text-[var(--foreground)]/50 flex items-center gap-1 whitespace-normal">
                <Sparkles className="w-5 h-5" />
                Interests:
            </span>
            <div className="relative h-12 overflow-hidden flex items-center shrink-0">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                        key={currentInterest.name}
                        className="inline-flex items-center gap-1.5 bg-gray-100 px-4 py-2 rounded-full text-base font-medium text-[var(--foreground)]"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: SPRING.BOUNCY.stiffness,
                            damping: SPRING.BOUNCY.damping,
                        }}
                    >
                        <span>{currentInterest.emoji}</span>
                        <span>{currentInterest.name}</span>
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
}
