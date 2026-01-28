'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Music2 } from 'lucide-react';
import { useSpotifyData } from '@/hooks';

// Spotify Icon SVG
const SpotifyIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
);

// Animated Equalizer Component
function AnimatedEqualizer({ isPlaying }: { isPlaying: boolean }) {
    const bars = [0, 1, 2, 3];

    return (
        <div className="flex items-end gap-0.5 h-4">
            {bars.map((bar) => (
                <motion.div
                    key={bar}
                    className="w-1 bg-green-500 rounded-full"
                    animate={isPlaying ? {
                        height: ['4px', '16px', '8px', '14px', '4px'],
                    } : { height: '4px' }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: bar * 0.15,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

interface SpotifyWidgetProps {
    /** Stop propagation on link clicks (useful in modal contexts) */
    stopPropagation?: boolean;
}

export default function SpotifyWidget({ stopPropagation = true }: SpotifyWidgetProps) {
    const { data: spotifyData, isLoading } = useSpotifyData();

    const handleLinkClick = (e: React.MouseEvent) => {
        if (stopPropagation) {
            e.stopPropagation();
        }
    };

    return (
        <div className="bg-gray-50 rounded-2xl p-4 flex-1 flex flex-col">
            <a
                href="https://open.spotify.com/user/1yxiftic7gmoy1oxgh4uidiii?si=e38e999c3c374446"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="flex items-center gap-3 mb-3 group w-fit"
            >
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-[#1DB954] group-active:bg-[#1DB954] group-hover:text-white group-active:text-white transition-all duration-200">
                    <SpotifyIcon />
                </div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide group-hover:text-[#1DB954] group-active:text-[#1DB954] transition-colors duration-200">
                    Spotify
                </span>
            </a>

            <div className="flex flex-row items-center gap-3 md:flex-col md:items-start xl:flex-row xl:items-center">
                {/* Album art */}
                {spotifyData?.albumImageUrl ? (
                    <div className="relative w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden">
                        <Image
                            src={spotifyData.albumImageUrl}
                            alt="Album art"
                            fill
                            sizes="48px"
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Music2 className="w-6 h-6 text-white/80" />
                    </div>
                )}

                <div className="min-w-0 w-full">
                    {isLoading ? (
                        <p className="text-sm text-gray-400">Loading...</p>
                    ) : spotifyData?.title ? (
                        <>
                            <div className="flex items-center gap-2 mb-1">
                                <AnimatedEqualizer isPlaying={spotifyData.isPlaying} />
                                <span className={`text-xs font-medium ${spotifyData.isPlaying ? 'text-green-600' : 'text-gray-500'}`}>
                                    {spotifyData.isPlaying ? 'Now Playing' : 'Last played'}
                                </span>
                            </div>
                            <a
                                href={spotifyData.songUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleLinkClick}
                                className="block hover:underline"
                            >
                                <p className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-2 break-words">
                                    {spotifyData.title}
                                </p>
                            </a>
                            <p className="text-[10px] md:text-xs text-gray-500 line-clamp-1">
                                {spotifyData.artist}
                            </p>
                        </>
                    ) : (
                        <p className="text-sm text-gray-400">Not connected</p>
                    )}
                </div>
            </div>
        </div>
    );
}
