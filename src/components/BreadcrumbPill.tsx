'use client';

interface BreadcrumbPillProps {
    prefix: string;
    section: string;
}

export default function BreadcrumbPill({ prefix, section }: BreadcrumbPillProps) {
    return (
        <div className="inline-flex items-center bg-background px-4 py-2 rounded-full">
            <span className="text-sm uppercase font-medium tracking-wide text-[var(--foreground)]">
                {prefix}
            </span>
            <span className="text-sm uppercasefont-medium tracking-wide text-[var(--foreground)]/40 mx-2">
                /
            </span>
            <span className="text-sm uppercase font-medium tracking-wide text-[var(--foreground)]/70">
                {section}
            </span>
        </div>
    );
}
