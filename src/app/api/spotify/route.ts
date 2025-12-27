import { getNowPlaying, getRecentlyPlayed } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const nowPlayingResponse = await getNowPlaying();

        // If no content (204) or error, try recently played
        if (nowPlayingResponse.status === 204 || nowPlayingResponse.status > 400) {
            return getRecentlyPlayedData();
        }

        const nowPlaying = await nowPlayingResponse.json();

        // If not currently playing, get recently played
        if (!nowPlaying.is_playing) {
            return getRecentlyPlayedData();
        }

        // Return currently playing song
        const track = nowPlaying.item;
        return NextResponse.json({
            isPlaying: true,
            title: track.name,
            artist: track.artists.map((artist: { name: string }) => artist.name).join(', '),
            albumImageUrl: track.album.images[0]?.url || '',
            songUrl: track.external_urls.spotify,
        });
    } catch (error) {
        console.error('Spotify API Error:', error);
        return NextResponse.json(
            { isPlaying: false, title: '', artist: '', albumImageUrl: '', songUrl: '' },
            { status: 500 }
        );
    }
}

async function getRecentlyPlayedData() {
    try {
        const recentResponse = await getRecentlyPlayed();

        if (recentResponse.status !== 200) {
            return NextResponse.json({
                isPlaying: false,
                title: '',
                artist: '',
                albumImageUrl: '',
                songUrl: '',
            });
        }

        const recentData = await recentResponse.json();
        const track = recentData.items[0]?.track;

        if (!track) {
            return NextResponse.json({
                isPlaying: false,
                title: '',
                artist: '',
                albumImageUrl: '',
                songUrl: '',
            });
        }

        return NextResponse.json({
            isPlaying: false,
            title: track.name,
            artist: track.artists.map((artist: { name: string }) => artist.name).join(', '),
            albumImageUrl: track.album.images[0]?.url || '',
            songUrl: track.external_urls.spotify,
        });
    } catch (error) {
        console.error('Recently Played Error:', error);
        return NextResponse.json(
            { isPlaying: false, title: '', artist: '', albumImageUrl: '', songUrl: '' },
            { status: 500 }
        );
    }
}
