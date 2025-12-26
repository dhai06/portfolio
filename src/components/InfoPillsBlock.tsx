'use client';

import { InfoPill } from '@/data/portfolioData';

interface InfoPillsBlockProps {
    pills: InfoPill[];
}

export default function InfoPillsBlock({ pills }: InfoPillsBlockProps) {
    return (
        <div className="bg-white p-6 border border-[var(--border)] rounded-xl my-2">
            <div className="flex flex-wrap gap-2">
                {pills.map((pill, index) => (
                    <span
                        key={index}
                        className="px-4 py-2 bg-[var(--background)] rounded-full text-sm text-[var(--foreground)] border border-[var(--border)]"
                    >
                        {pill.label}
                    </span>
                ))}
            </div>
        </div>
    );
}
