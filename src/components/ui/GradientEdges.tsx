'use client';

interface GradientEdgesProps {
    /** Direction of gradient fade (default: 'horizontal') */
    direction?: 'horizontal' | 'vertical';
    /** Size of gradient in mobile (default: 'w-16' or 'h-16') */
    mobileSize?: string;
    /** Size of gradient in desktop (default: 'md:w-24' or 'md:h-24') */
    desktopSize?: string;
    /** Base color to fade to (default: 'white') */
    color?: 'white' | 'black' | 'transparent';
    /** Z-index for the gradients (default: 10) */
    zIndex?: number;
}

export default function GradientEdges({
    direction = 'horizontal',
    mobileSize,
    desktopSize,
    color = 'white',
    zIndex = 10,
}: GradientEdgesProps) {
    const colorClass = {
        white: 'from-white',
        black: 'from-black',
        transparent: 'from-transparent',
    }[color];

    if (direction === 'horizontal') {
        const widthMobile = mobileSize || 'w-16';
        const widthDesktop = desktopSize || 'md:w-24';

        return (
            <>
                <div
                    className={`absolute left-0 top-0 bottom-0 ${widthMobile} ${widthDesktop} bg-gradient-to-r ${colorClass} to-transparent pointer-events-none`}
                    style={{ zIndex }}
                />
                <div
                    className={`absolute right-0 top-0 bottom-0 ${widthMobile} ${widthDesktop} bg-gradient-to-l ${colorClass} to-transparent pointer-events-none`}
                    style={{ zIndex }}
                />
            </>
        );
    }

    // Vertical direction
    const heightMobile = mobileSize || 'h-16';
    const heightDesktop = desktopSize || 'md:h-24';

    return (
        <>
            <div
                className={`absolute top-0 left-0 right-0 ${heightMobile} ${heightDesktop} bg-gradient-to-b ${colorClass} to-transparent pointer-events-none`}
                style={{ zIndex }}
            />
            <div
                className={`absolute bottom-0 left-0 right-0 ${heightMobile} ${heightDesktop} bg-gradient-to-t ${colorClass} to-transparent pointer-events-none`}
                style={{ zIndex }}
            />
        </>
    );
}
