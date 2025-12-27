'use client';

import { Heart, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Spotify Icon
const SpotifyIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1DB954" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0Zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02Zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2Zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3Z" />
    </svg>
);

interface SpotifyBlockProps {
    onLike?: () => void;
}

export default function SpotifyBlock({ onLike }: SpotifyBlockProps) {
    const [liked, setLiked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
        onLike?.();
    };

    return (
        <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] p-6 border border-[var(--border)] rounded-xl text-white">
            <p className="text-sm text-white/60 mb-4">Currently vibing to</p>

            <div className="flex items-center gap-4">
                {/* Album Art Placeholder */}
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <SpotifyIcon />
                </div>

                <div className="flex-1">
                    <p className="font-semibold text-lg">Coding Focus</p>
                    <p className="text-sm text-white/60">Lo-Fi Beats • Playlist</p>
                </div>

                {/* Play/Pause Button */}
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-[#1DB954] flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                >
                    {isPlaying ? (
                        <Pause className="w-5 h-5 text-black fill-black" />
                    ) : (
                        <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                    )}
                </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[#1DB954] rounded-full"
                        initial={{ width: '35%' }}
                        animate={{ width: isPlaying ? '100%' : '35%' }}
                        transition={{ duration: isPlaying ? 120 : 0 }}
                    />
                </div>
                <div className="flex justify-between text-xs text-white/40 mt-1">
                    <span>1:24</span>
                    <span>3:45</span>
                </div>
            </div>

            {/* Like button */}
            <button
                onClick={handleLikeClick}
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 shadow-md flex items-center justify-center border border-white/20 hover:scale-105 transition-transform"
                aria-label="Like"
            >
                <motion.div
                    animate={{ scale: liked ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Heart
                        className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`}
                    />
                </motion.div>
            </button>
        </div>
    );
}
