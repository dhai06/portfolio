'use client';

import { Heart } from 'lucide-react';

interface SummaryBlockProps {
    likedSummaries: string[];
}

export default function SummaryBlock({ likedSummaries }: SummaryBlockProps) {
    if (likedSummaries.length === 0) {
        return null;
    }

    return (
        <div className="relative bg-white p-8 pb-8 rounded-3xl my-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <p className="text-xs uppercase font-bold tracking-widest text-[var(--foreground)]/50 mb-3">
                What you liked
            </p>
            <ul className="space-y-2">
                {likedSummaries.map((summary, index) => (
                    <li
                        key={index}
                        className="text-lg font-serif text-[var(--foreground)] leading-tight flex items-start gap-2"
                    >
                        <Heart className="w-4 h-4 fill-red-500 text-red-500 flex-shrink-0 mt-1" />
                        <span>{summary}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

