'use client';

import { MapPin, Clock, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Moon, CloudMoon } from 'lucide-react';
import { useCurrentTime, useWeatherData } from '@/hooks';
import { LOCATION } from '@/lib/constants';
import type { WeatherCondition } from '@/data/types';

function getWeatherIcon(condition: WeatherCondition, isDay: boolean) {
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
}

export default function LocationTimeWidget() {
    const { time, isReady } = useCurrentTime();
    const { data: weather } = useWeatherData();

    return (
        <div className="bg-gray-50 rounded-2xl p-4 flex-1 flex flex-col justify-center gap-2">
            <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{LOCATION.DISPLAY_NAME}</span>
                <div className="ml-auto">
                    {getWeatherIcon(weather.condition, weather.isDay)}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-2xl font-semibold text-gray-900">
                    {isReady ? time : '--:--'}
                </span>
            </div>
            <span className="text-xs text-gray-400">{LOCATION.TIMEZONE_LABEL}</span>
        </div>
    );
}
