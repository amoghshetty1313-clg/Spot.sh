import React from 'react';
import { useSpotify } from '../context/SpotifyContext';
import TopBar from '../components/TopBar';
import TrackCard from '../components/TrackCard';

export default function TopTracks() {
    const { topTracks, loading } = useSpotify();

    if (loading) {
        return (
            <div className="font-mono text-spotify-green animate-pulse">
                {">"} FETCHING TOP TRACKS...
            </div>
        );
    }

    const tracks = topTracks?.items || [];

    return (
        <div className="font-mono">
            <TopBar
                title="Top Tracks"
                subtitle={`${tracks.length} Top Extracted`}
            />

            {/* Summary stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="border border-gray-800 bg-black p-4 group hover:border-spotify-green transition-colors relative">
                    <p className="text-xl font-bold text-spotify-green">{tracks.length}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{">"} Total Tracks</p>
                </div>
                <div className="border border-gray-800 bg-black p-4 group hover:border-spotify-green transition-colors relative">
                    <p className="text-xl font-bold text-gray-200">
                        {tracks.length > 0 ? Math.round(tracks.reduce((s, t) => s + (t.popularity || 0), 0) / tracks.length) : 0}%
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{">"} Avg. Popularity</p>
                </div>
                <div className="border border-gray-800 bg-black p-4 group hover:border-spotify-green transition-colors relative">
                    <p className="text-xl font-bold text-gray-200">
                        {new Set(tracks.flatMap(t => t.artists?.map(a => a.name) || [])).size}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{">"} Unique Artists</p>
                </div>
            </div>

            {/* Track Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {tracks.map((track, i) => (
                    <TrackCard key={track.id} track={track} rank={i + 1} />
                ))}
            </div>

            {tracks.length === 0 && (
                <div className="text-center py-16 border border-gray-800 border-dashed">
                    <p className="text-sm text-gray-500 uppercase tracking-widest">No top tracks found in database.</p>
                </div>
            )}
        </div>
    );
}
