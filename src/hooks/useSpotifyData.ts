'use client';

import { useState, useEffect } from 'react';
import { TIMING } from '@/lib/constants';
import type { SpotifyData } from '@/data/types';

interface UseSpotifyDataReturn {
    data: SpotifyData | null;
    isLoading: boolean;
    error: Error | null;
}

export function useSpotifyData(): UseSpotifyDataReturn {
    const [data, setData] = useState<SpotifyData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchSpotify = async () => {
            try {
                const response = await fetch('/api/spotify');
                if (!response.ok) {
                    throw new Error('Failed to fetch Spotify data');
                }
                const spotifyData = await response.json();
                setData(spotifyData);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch Spotify data:', err);
                setError(err instanceof Error ? err : new Error('Unknown error'));
                setData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSpotify();

        // Refresh at configured interval
        const interval = setInterval(fetchSpotify, TIMING.SPOTIFY_REFRESH);
        return () => clearInterval(interval);
    }, []);

    return { data, isLoading, error };
}
