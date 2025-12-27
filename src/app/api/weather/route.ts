import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Using Open-Meteo API (free, no API key required)
        // Vancouver coordinates: 49.2827° N, 123.1207° W
        const response = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=49.2827&longitude=-123.1207&current=weather_code,is_day&timezone=America/Los_Angeles'
        );

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        const weatherCode = data.current.weather_code;
        const isDay = data.current.is_day === 1;

        // Map WMO weather codes to weather conditions
        // https://open-meteo.com/en/docs
        let condition = 'clear';
        if (weatherCode === 0) {
            condition = 'clear';
        } else if ([1, 2, 3].includes(weatherCode)) {
            condition = 'partly-cloudy';
        } else if ([45, 48].includes(weatherCode)) {
            condition = 'cloudy';
        } else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
            condition = 'rainy';
        } else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
            condition = 'snowy';
        } else if ([95, 96, 99].includes(weatherCode)) {
            condition = 'stormy';
        }

        return NextResponse.json({ condition, isDay });
    } catch (error) {
        console.error('Weather API error:', error);
        return NextResponse.json({ condition: 'clear', isDay: true }, { status: 200 });
    }
}
