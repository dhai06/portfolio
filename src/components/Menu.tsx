'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X } from 'lucide-react';
import { CardData } from '@/data/portfolioData';

interface MenuProps {
    profiles: CardData[];
    onSelect: (index: number) => void;
    onMenuStateChange?: (isOpen: boolean) => void;
    currentIndex: number;
}

export default function Menu({ profiles, onSelect, onMenuStateChange, currentIndex }: MenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSetIsOpen = (open: boolean) => {
        setIsOpen(open);
        onMenuStateChange?.(open);
    };

    return (
        <>
            <button
                onClick={() => handleSetIsOpen(true)}
                className="p-2 rounded-full hover:bg-[var(--border)] active:bg-[var(--border)] transition-colors"
                aria-label="Open Menu"
            >
                <MenuIcon className="text-[var(--foreground)] w-5 h-5" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed top-0 left-0 right-0 bottom-0 -mt-[env(safe-area-inset-top)] z-[60] bg-[var(--background)] flex flex-col items-center justify-center pt-[env(safe-area-inset-top)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button
                            onClick={() => handleSetIsOpen(false)}
                            className="absolute top-4 right-4 p-3 rounded-full hover:bg-[var(--border)] active:bg-[var(--border)] transition-colors"
                        >
                            <X className="text-[var(--foreground)] w-5 h-5" />
                        </button>

                        <nav className="flex flex-col gap-6 text-center">
                            {profiles.map((profile, index) => (
                                <button
                                    key={profile.id}
                                    onClick={() => {
                                        // Prevent navigation if already on this section
                                        if (index === currentIndex) {
                                            handleSetIsOpen(false);
                                            return;
                                        }
                                        onSelect(index);
                                        handleSetIsOpen(false);
                                    }}
                                    className="text-2xl font-serif text-[var(--foreground)]/70 hover:text-[var(--foreground)] active:text-[var(--foreground)] hover:scale-105 active:scale-105 transition-all"
                                >
                                    {profile.type === 'about' ? 'About' : profile.type === 'project' ? profile.name : 'Contact'}
                                </button>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
