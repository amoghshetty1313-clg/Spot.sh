import React, { useMemo } from 'react';
import { useSpotify } from '../context/SpotifyContext';
import TopBar from '../components/TopBar';
import StatsCard from '../components/StatsCard';
import TrackCard from '../components/TrackCard';
import TopArtistsChart from '../charts/TopArtistsChart';
import GenreDistributionChart from '../charts/GenreDistributionChart';
import ListeningTimeChart from '../charts/ListeningTimeChart';

export default function Dashboard() {
    const { user, topTracks, topArtists, recentlyPlayed, loading, premiumRequired } = useSpotify();

    // Derived stats
    const stats = useMemo(() => {
        const totalTracks = topTracks?.items?.length || 0;
        const totalArtists = topArtists?.items?.length || 0;
        const recentCount = recentlyPlayed?.items?.length || 0;

        // Top genre
        const genreCount = {};
        topArtists?.items?.forEach(a => {
            a.genres?.forEach(g => {
                genreCount[g] = (genreCount[g] || 0) + 1;
            });
        });
        const topGenre = Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0];

        // Average popularity
        const avgPopularity = totalTracks > 0
            ? Math.round(topTracks.items.reduce((s, t) => s + (t.popularity || 0), 0) / totalTracks)
            : 0;

        // Unique artists in recent plays
        const recentArtists = new Set();
        recentlyPlayed?.items?.forEach(item => {
            item.track?.artists?.forEach(a => recentArtists.add(a.name));
        });

        // Listening streak (consecutive days in recently played)
        const days = new Set();
        recentlyPlayed?.items?.forEach(item => {
            days.add(new Date(item.played_at).toDateString());
        });

        return {
            totalTracks,
            totalArtists,
            recentCount,
            topGenre: topGenre ? topGenre[0].toUpperCase() : 'N/A',
            avgPopularity,
            uniqueRecentArtists: recentArtists.size,
            streakDays: days.size,
        };
    }, [topTracks, topArtists, recentlyPlayed]);

    if (loading) {
        return (
            <div className="space-y-6 font-mono text-spotify-green">
                <p className="animate-pulse">{">"} FETCHING DATA FROM SECURE SERVER...</p>
                <div className="grid grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="border border-gray-800 bg-gray-900 h-24" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="font-mono">
            <TopBar
                title={`Welcome back, ${user?.display_name?.split(' ')[0] || 'USER_99'}`}
                subtitle="SYSTEM OVERVIEW // LIVE LISTENING DATA"
            />

            {/* Dashboard Highlights */}
            <div className="border border-gray-800 bg-black p-6 mb-8 relative">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-spotify-green"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-spotify-green"></div>

                <h2 className="text-xl font-bold text-spotify-green uppercase tracking-widest mb-1 italic">
                    {">"} spot.sh
                </h2>
                <p className="text-gray-500 text-sm">
                    Personal Spotify Analytics Dashboard.
                </p>
            </div>

            {/* Spotify Free / 403 Premium Error Alert */}
            {premiumRequired && (
                <div className="border border-red-500 bg-black p-6 mb-8 text-red-500 relative">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-500"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-500"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-500"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-500"></div>

                    <h3 className="font-bold text-lg mb-2 uppercase tracking-widest">
                        [!] ERROR 403: SPOTIFY PREMIUM REQUIRED
                    </h3>
                    <p className="text-sm mb-2 text-red-400">
                        {">"} SYSTEM_HALT: The Spotify Web API demands an active Premium Subscription for both the Developer account and the User account.
                    </p>
                    <p className="text-sm text-red-400">
                        {">"} Access to data stream is restricted directly by the Spotify API platform. Upgrade account to restore functionality.
                    </p>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <StatsCard label="Top Tracks" value={stats.totalTracks} />
                <StatsCard label="Top Artists" value={stats.totalArtists} />
                <StatsCard label="Top Genre" value={stats.topGenre} />
                <StatsCard label="Avg POP." value={`${stats.avgPopularity}%`} />
            </div>

            {/* Second Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <StatsCard label="Streak" value={`${stats.streakDays} DAYS`} subtitle="RECENT ACTIVITY" />
                <StatsCard label="Recent ART." value={stats.uniqueRecentArtists} subtitle="UNIQUE ARTISTS" />
                <StatsCard label="Playbacks" value={stats.recentCount} subtitle="TRACKS LOGGED" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 border-t border-gray-800 pt-8">
                <TopArtistsChart artists={topArtists} />
                <GenreDistributionChart artists={topArtists} />
            </div>

            <div className="mb-8 border-t border-gray-800 pt-8">
                <ListeningTimeChart recentlyPlayed={recentlyPlayed} />
            </div>

            {/* Top 4 Tracks Preview */}
            <div className="mb-8 border-t border-gray-800 pt-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        {">"} Your Top Tracks
                    </h3>
                    <a href="/top-tracks" className="text-[10px] uppercase tracking-widest text-spotify-green hover:underline">
                        [ VIEW ALL ]
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {topTracks?.items?.slice(0, 4).map((track, i) => (
                        <TrackCard key={track.id} track={track} rank={i + 1} />
                    ))}
                </div>
            </div>
        </div>
    );
}
