'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X } from 'lucide-react';
import { CardData } from '@/data/portfolioData';

interface MenuProps {
    profiles: CardData[];
    onSelect: (index: number) => void;
}

export default function Menu({ profiles, onSelect }: MenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-3 right-14 z-50 p-2 rounded-full hover:bg-[var(--border)] transition-colors"
                aria-label="Open Menu"
            >
                <MenuIcon className="text-[var(--foreground)] w-5 h-5" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[60] bg-[var(--background)] flex flex-col items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-3 rounded-full hover:bg-[var(--border)] transition-colors"
                        >
                            <X className="text-[var(--foreground)] w-6 h-6" />
                        </button>

                        <nav className="flex flex-col gap-6 text-center">
                            {profiles.map((profile, index) => (
                                <button
                                    key={profile.id}
                                    onClick={() => {
                                        onSelect(index);
                                        setIsOpen(false);
                                    }}
                                    className="text-2xl font-serif text-[var(--foreground)]/70 hover:text-[var(--foreground)] hover:scale-105 transition-all"
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
