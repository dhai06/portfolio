interface TypewriterTextProps {
    text: string;
    className?: string;
    startAnimation?: boolean;
}

/**
 * TypewriterText - Simple text renderer (animation removed for performance)
 */
export default function TypewriterText({ text, className = '' }: TypewriterTextProps) {
    // Handle newlines in text
    const lines = text.split('\n');

    return (
        <span className={className}>
            {lines.map((line, index) => (
                <span key={index}>
                    {index > 0 && <br />}
                    {line}
                </span>
            ))}
        </span>
    );
}
