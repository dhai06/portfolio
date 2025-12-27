'use client';

import Image from 'next/image';
import { Heart, MapPin, Sparkles, Clock, Music2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import TypewriterText from './TypewriterText';

// Simple Icons SVG components
const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const GitHubIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
    </svg>
);

// Animated Equalizer Component
const AnimatedEqualizer = ({ isPlaying }: { isPlaying: boolean }) => {
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
};

interface AboutIntroBlockProps {
    imageSrc: string;
    imageAlt: string;
    onLike?: () => void;
}

export default function AboutIntroBlock({ imageSrc, imageAlt, onLike }: AboutIntroBlockProps) {
    const [liked, setLiked] = useState(false);
    const [currentTime, setCurrentTime] = useState<string>('');

    const handleClick = () => {
        setLiked(!liked);
        onLike?.();
    };

    const interests = [
        { name: 'Formula 1', emoji: '🏎️' },
        { name: 'Aviation', emoji: '✈️' },
        { name: 'Guitars', emoji: '🎸' },
        { name: 'Fitness', emoji: '🏋️' },
        { name: 'Travel', emoji: '🌎' },
        { name: 'Photography', emoji: '📸' },
        { name: 'Cooking', emoji: '🍳' },
        { name: 'Tennis', emoji: '🎾' }
    ];

    const [currentInterestIndex, setCurrentInterestIndex] = useState(0);

    // Update time every minute (Vancouver PST)
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const vancouverTime = now.toLocaleTimeString('en-US', {
                timeZone: 'America/Vancouver',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
            setCurrentTime(vancouverTime);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentInterestIndex((prev) => (prev + 1) % interests.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    // Spotify data state
    const [spotifyData, setSpotifyData] = useState<{
        isPlaying: boolean;
        title: string;
        artist: string;
        albumImageUrl: string;
        songUrl: string;
    } | null>(null);
    const [spotifyLoading, setSpotifyLoading] = useState(true);

    // Fetch Spotify data
    useEffect(() => {
        const fetchSpotify = async () => {
            try {
                const response = await fetch('/api/spotify');
                const data = await response.json();
                setSpotifyData(data);
            } catch (error) {
                console.error('Failed to fetch Spotify data:', error);
                setSpotifyData(null);
            } finally {
                setSpotifyLoading(false);
            }
        };

        fetchSpotify();
        // Refresh every 30 seconds
        const interval = setInterval(fetchSpotify, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
            {/* Image Block - 2 columns, portrait aspect ratio */}
            <div className="md:col-span-2 relative h-full min-h-[400px] bg-gray-100 rounded-[2rem] overflow-hidden group">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    priority
                />
            </div>

            {/* Content Block - 3 columns */}
            <div className="md:col-span-3 relative bg-white rounded-[2rem] p-6 md:p-8 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                {/* Background blur orb for depth */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-100/60 to-purple-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                {/* Two-column layout for desktop */}
                <div className="relative z-10 flex flex-col md:flex-row gap-6 flex-1">
                    {/* Left Side - Main Content (~65%) */}
                    <div className="flex-1 md:w-[65%] flex flex-col">
                        {/* Greeting - Large heading */}
                        <div className="mb-4">
                            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[var(--foreground)] leading-tight mb-2">
                                <TypewriterText text="Hi, I'm Daniel" />
                            </h2>
                            <p className="text-base text-[var(--foreground)]/60">
                                Electrical Engineering Student & Developer
                            </p>
                        </div>

                        {/* Education & Experience Pills */}
                        <div className="flex flex-wrap gap-3 mb-4">
                            {/* UBC Pill */}
                            <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl">
                                <img
                                    src="/images/ubc-logo.png"
                                    alt="UBC Logo"
                                    width={28}
                                    height={28}
                                    className="object-contain"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-[var(--foreground)] leading-tight">Electrical Engineering</span>
                                    <span className="text-xs text-[var(--foreground)]/60">University of British Columbia</span>
                                </div>
                            </div>

                            {/* Formula UBC Pill */}
                            <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl">
                                <img
                                    src="/images/formula-ubc-logo.png"
                                    alt="Formula UBC Logo"
                                    width={28}
                                    height={28}
                                    className="object-contain"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-[var(--foreground)] leading-tight">Formula UBC</span>
                                    <span className="text-xs text-[var(--foreground)]/60">Aerodynamics</span>
                                </div>
                            </div>
                        </div>

                        {/* Interests - Inline sliding pill */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-sm text-[var(--foreground)]/50 flex items-center gap-1">
                                <Sparkles className="w-4 h-4" />
                                Currently into:
                            </span>
                            <div className="relative h-7 overflow-hidden flex items-center">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.span
                                        key={interests[currentInterestIndex].name}
                                        className="inline-flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-[var(--foreground)]"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 25
                                        }}
                                    >
                                        <span>{interests[currentInterestIndex].emoji}</span>
                                        <span>{interests[currentInterestIndex].name}</span>
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Social Links & Heart Button - pushed to bottom */}
                        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                            {/* Social Buttons */}
                            <a
                                href="https://www.linkedin.com/in/daniel-hai06"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-200"
                                aria-label="LinkedIn"
                            >
                                <LinkedInIcon />
                            </a>
                            <a
                                href="https://github.com/dhai06"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-200"
                                aria-label="GitHub"
                            >
                                <GitHubIcon />
                            </a>
                            <a
                                href="https://www.instagram.com/dan._.hai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all duration-200"
                                aria-label="Instagram"
                            >
                                <InstagramIcon />
                            </a>

                            <div className="flex-1" />

                            <span className="text-sm text-[var(--foreground)]/40 italic hidden sm:block">tap to see more →</span>

                            <button
                                onClick={handleClick}
                                className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100 hover:shadow-xl transition-shadow duration-200"
                                aria-label="Like"
                            >
                                <motion.div
                                    animate={{ scale: liked ? [1, 1.4, 1] : 1 }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                >
                                    <Heart
                                        className={`w-6 h-6 transition-colors duration-200 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                                    />
                                </motion.div>
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Widgets (~35%) */}
                    <div className="md:w-[35%] flex flex-col gap-4">
                        {/* Location & Time Widget */}
                        <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm font-medium">Vancouver, BC</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-2xl font-semibold text-gray-900">{currentTime || '--:--'}</span>
                            </div>
                            <span className="text-xs text-gray-400">Pacific Time (PST)</span>
                        </div>

                        {/* Spotify Widget */}
                        <div className="bg-gray-50 rounded-2xl p-4 flex-1 flex flex-col">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                    <Music2 className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Spotify</span>
                            </div>

                            <div className="flex items-center gap-3 flex-1">
                                {/* Album art - real or placeholder */}
                                {spotifyData?.albumImageUrl ? (
                                    <img
                                        src={spotifyData.albumImageUrl}
                                        alt="Album art"
                                        className="w-12 h-12 rounded-lg flex-shrink-0 object-cover"
                                    />
                                ) : (
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Music2 className="w-6 h-6 text-white/80" />
                                    </div>
                                )}

                                <div className="flex-1 min-w-0">
                                    {spotifyLoading ? (
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
                                                className="block hover:underline"
                                            >
                                                <p className="text-sm font-semibold text-gray-900 truncate">
                                                    {spotifyData.title}
                                                </p>
                                            </a>
                                            <p className="text-xs text-gray-500 truncate">{spotifyData.artist}</p>
                                        </>
                                    ) : (
                                        <p className="text-sm text-gray-400">Not connected</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
