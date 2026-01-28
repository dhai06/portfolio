'use client';

import { useState, useEffect } from 'react';
import { TIMING } from '@/lib/constants';
import type { WeatherData, WeatherCondition } from '@/data/types';

interface UseWeatherDataReturn {
    data: WeatherData;
    isLoading: boolean;
    error: Error | null;
}

const DEFAULT_WEATHER: WeatherData = {
    condition: 'clear',
    isDay: true,
};

export function useWeatherData(): UseWeatherDataReturn {
    const [data, setData] = useState<WeatherData>(DEFAULT_WEATHER);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch('/api/weather');
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const weatherData = await response.json();
                setData({
                    condition: (weatherData.condition as WeatherCondition) || 'clear',
                    isDay: weatherData.isDay !== undefined ? weatherData.isDay : true,
                });
                setError(null);
            } catch (err) {
                console.error('Failed to fetch weather:', err);
                setError(err instanceof Error ? err : new Error('Unknown error'));
                // Keep default weather on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeather();

        // Refresh at configured interval
        const interval = setInterval(fetchWeather, TIMING.WEATHER_REFRESH);
        return () => clearInterval(interval);
    }, []);

    return { data, isLoading, error };
}
