'use client';

import Image from 'next/image';
import { Heart, MapPin, Sparkles, Clock, Music2, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Moon, CloudMoon } from 'lucide-react';
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

const SpotifyIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
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
    isLiked: boolean;
    onHeartClick: () => void;
    onBlockClick?: () => void;
}

export default function AboutIntroBlock({ imageSrc, imageAlt, isLiked, onHeartClick, onBlockClick }: AboutIntroBlockProps) {
    const [currentTime, setCurrentTime] = useState<string>('');

    const [currentInterestIndex, setCurrentInterestIndex] = useState(0);

    const interests = [
        { name: 'Formula 1', emoji: '🏎️' },
        { name: 'Cooking', emoji: '🍳' },
        { name: 'Fashion', emoji: '👕' },
        { name: 'Working Out', emoji: '🏋️' },
        { name: 'Playing Piano', emoji: '🎹' },
        { name: 'Discovering Restaurants', emoji: '🍽️' },
        { name: 'Mechanical Keyboards', emoji: '⌨️' },
        { name: 'Watching TV Shows', emoji: '📺' },
        { name: 'Random Projects', emoji: '🛠️' }
    ];

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

    // Weather state
    const [weather, setWeather] = useState<{ condition: string; isDay: boolean }>({ condition: 'clear', isDay: true });

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

    // Fetch weather data
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch('/api/weather');
                const data = await response.json();
                setWeather({
                    condition: data.condition || 'clear',
                    isDay: data.isDay !== undefined ? data.isDay : true
                });
            } catch (error) {
                console.error('Failed to fetch weather:', error);
            }
        };

        fetchWeather();
        // Refresh every 10 minutes
        const interval = setInterval(fetchWeather, 600000);
        return () => clearInterval(interval);
    }, []);

    // Get weather icon component
    const getWeatherIcon = () => {
        const { condition, isDay } = weather;

        switch (condition) {
            case 'rainy':
                return <CloudRain className="w-5 h-5" />;
            case 'snowy':
                return <CloudSnow className="w-5 h-5" />;
            case 'stormy':
                return <CloudLightning className="w-5 h-5" />;
            case 'cloudy':
                return <Cloud className="w-5 h-5" />;
            case 'partly-cloudy':
                return isDay ? <Cloud className="w-5 h-5" /> : <CloudMoon className="w-5 h-5" />;
            case 'clear':
            default:
                return isDay ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />;
        }
    };

    // Hint state - show immediately, hide after first heart press
    const [showHint, setShowHint] = useState(true);

    // Hide hint after first heart press
    useEffect(() => {
        if (isLiked) {
            setShowHint(false);
        }
    }, [isLiked]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
            {/* Image Block - 2 columns, portrait aspect ratio */}
            <div
                className="md:col-span-2 relative h-full min-h-[400px] bg-gray-100 rounded-[2rem] overflow-hidden group cursor-pointer"
                onClick={onBlockClick}
            >
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    priority
                />
            </div>

            {/* Content Block - 3 columns */}
            <div
                className="md:col-span-3 relative bg-white rounded-[2rem] p-6 md:p-8 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden cursor-pointer"
                onClick={onBlockClick}
            >
                {/* Two-column layout for desktop */}
                <div className="relative z-10 flex flex-col md:flex-row gap-6 flex-1">
                    {/* Left Side - Main Content (~65%) */}
                    <div className="flex-1 md:w-[65%] h-full flex flex-col justify-between gap-6">
                        {/* Greeting - Large heading */}
                        <div className="">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--foreground)] leading-tight mb-2 break-words w-full">
                                <TypewriterText text="Hi, I'm Daniel" />
                            </h2>
                            <p className="text-base font-medium text-[var(--foreground)]/50 flex items-center gap-1 whitespace-normal">
                                Electrical Engineering Student
                            </p>
                        </div>

                        {/* Education & Experience Pills */}
                        <div className="flex flex-wrap gap-3">
                            {/* UBC Pill */}
                            <div className="w-full sm:flex-1 min-w-0 flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl">
                                <img
                                    src="/images/ubc-logo.png"
                                    alt="UBC Logo"
                                    width={28}
                                    height={28}
                                    className="object-contain flex-shrink-0"
                                />
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-semibold text-[var(--foreground)] leading-tight break-words">Electrical Engineering</span>
                                    <span className="text-xs text-[var(--foreground)]/60 break-words">University of British Columbia</span>
                                </div>
                            </div>

                            {/* Formula UBC Pill */}
                            <div className="w-full sm:flex-1 min-w-0 flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl">
                                <img
                                    src="/images/formula-ubc-logo.png"
                                    alt="Formula UBC Logo"
                                    width={28}
                                    height={28}
                                    className="object-contain flex-shrink-0"
                                />
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-semibold text-[var(--foreground)] leading-tight break-words">Formula UBC</span>
                                    <span className="text-xs text-[var(--foreground)]/60 break-words">Aerodynamics</span>
                                </div>
                            </div>
                        </div>

                        {/* Interests - Inline sliding pill */}
                        <div className="flex flex-wrap items-center gap-4 gap-y-2">
                            <span className="text-base font-medium text-[var(--foreground)]/50 flex items-center gap-1 whitespace-normal">
                                <Sparkles className="w-5 h-5" />
                                Interests:
                            </span>
                            <div className="relative h-12 overflow-hidden flex items-center shrink-0">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.span
                                        key={interests[currentInterestIndex].name}
                                        className="inline-flex items-center gap-1.5 bg-gray-100 px-4 py-2 rounded-full text-base font-medium text-[var(--foreground)]"
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

                    </div>

                    {/* Right Side - Widgets (~35%) */}
                    <div className="md:w-[35%] flex flex-col gap-4">
                        {/* Location & Time Widget */}
                        <div className="bg-gray-50 rounded-2xl p-4 flex-1 flex flex-col justify-center gap-2">
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm font-medium">Raincouver, BC</span>
                                <div className="ml-auto">
                                    {getWeatherIcon()}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-2xl font-semibold text-gray-900">{currentTime || '--:--'}</span>
                            </div>
                            <span className="text-xs text-gray-400">Pacific Time (PST)</span>
                        </div>

                        {/* Spotify Widget */}
                        <div className="bg-gray-50 rounded-2xl p-4 flex-1 flex flex-col">
                            <a
                                href="https://open.spotify.com/user/1yxiftic7gmoy1oxgh4uidiii?si=e38e999c3c374446"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-3 mb-3 group w-fit"
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-[#1DB954] group-active:bg-[#1DB954] group-hover:text-white group-active:text-white transition-all duration-200">
                                    <SpotifyIcon />
                                </div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide group-hover:text-[#1DB954] group-active:text-[#1DB954] transition-colors duration-200">Spotify</span>
                            </a>

                            <div className="flex flex-row items-center gap-3 md:flex-col md:items-start xl:flex-row xl:items-center">
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

                                <div className="min-w-0 w-full">
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
                                                onClick={(e) => e.stopPropagation()}
                                                className="block hover:underline"
                                            >
                                                <p className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-2 break-words">
                                                    {spotifyData.title}
                                                </p>
                                            </a>
                                            <p className="text-[10px] md:text-xs text-gray-500 line-clamp-1">{spotifyData.artist}</p>
                                        </>
                                    ) : (
                                        <p className="text-sm text-gray-400">Not connected</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Links & Heart Button - at bottom of card */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-4 pt-4 mt-6 border-t border-gray-100">
                    {/* Social Buttons */}
                    <a
                        href="https://www.linkedin.com/in/daniel-hai06"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black active:bg-black hover:text-white active:text-white transition-all duration-200"
                        aria-label="LinkedIn"
                    >
                        <LinkedInIcon />
                    </a>
                    <a
                        href="https://github.com/dhai06"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black active:bg-black hover:text-white active:text-white transition-all duration-200"
                        aria-label="GitHub"
                    >
                        <GitHubIcon />
                    </a>
                    <a
                        href="https://www.instagram.com/dan._.hai"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black active:bg-black hover:text-white active:text-white transition-all duration-200"
                        aria-label="Instagram"
                    >
                        <InstagramIcon />
                    </a>

                    <div className="flex-1" />

                    <div className="relative group/heart flex items-center">
                        <AnimatePresence>
                            {showHint && !isLiked && (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 5 }}
                                    className="absolute right-full mr-3 whitespace-nowrap z-10 pointer-events-none"
                                >
                                    <div className="bg-black text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-xl relative">
                                        press this :)
                                        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-black transform rotate-45"></div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onHeartClick();
                            }}
                            className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-100 hover:border-red-500 active:border-red-500 hover:shadow-xl active:shadow-xl hover:bg-red-50 active:bg-red-50 transition-all duration-200 relative z-10"
                            aria-label="Like"
                        >
                            <motion.div
                                animate={{ scale: isLiked ? [1, 1.4, 1] : 1 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                            >
                                <Heart
                                    className={`w-6 h-6 transition-colors duration-200 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/heart:text-red-500 group-active/heart:text-red-500'}`}
                                />
                            </motion.div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
