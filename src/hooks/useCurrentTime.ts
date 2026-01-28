'use client';

import { useState, useEffect } from 'react';
import { TIMING, LOCATION } from '@/lib/constants';

interface UseCurrentTimeOptions {
    /** Timezone to display (default: LOCATION.TIMEZONE) */
    timezone?: string;
    /** Update interval in ms (default: TIMING.TIME_UPDATE) */
    updateInterval?: number;
}

interface UseCurrentTimeReturn {
    /** Formatted time string (e.g., "3:45 PM") */
    time: string;
    /** Whether the time has been initialized */
    isReady: boolean;
}

export function useCurrentTime({
    timezone = LOCATION.TIMEZONE,
    updateInterval = TIMING.TIME_UPDATE,
}: UseCurrentTimeOptions = {}): UseCurrentTimeReturn {
    const [time, setTime] = useState<string>('');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formattedTime = now.toLocaleTimeString('en-US', {
                timeZone: timezone,
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
            setTime(formattedTime);
            if (!isReady) setIsReady(true);
        };

        updateTime();
        const interval = setInterval(updateTime, updateInterval);
        return () => clearInterval(interval);
    }, [timezone, updateInterval, isReady]);

    return { time, isReady };
}
