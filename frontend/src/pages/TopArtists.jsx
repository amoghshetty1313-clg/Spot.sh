import React from 'react';
import { useSpotify } from '../context/SpotifyContext';
import TopBar from '../components/TopBar';
import ArtistCard from '../components/ArtistCard';
import TopArtistsChart from '../charts/TopArtistsChart';
import GenreDistributionChart from '../charts/GenreDistributionChart';

export default function TopArtists() {
    const { topArtists, loading } = useSpotify();

    if (loading) {
        return (
            <div className="font-mono text-spotify-green animate-pulse">
                {">"} FETCHING TOP ARTISTS...
            </div>
        );
    }

    const artists = topArtists?.items || [];

    return (
        <div className="font-mono">
            <TopBar
                title="Top Artists"
                subtitle={`[ ${artists.length} ] ARTISTS EXTRACTED`}
            />

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 border-t border-gray-800 pt-8">
                <TopArtistsChart artists={topArtists} />
                <GenreDistributionChart artists={topArtists} />
            </div>

            {/* Artist Grid */}
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 border-t border-gray-800 pt-8">
                {">"} All Artists
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {artists.map((artist, i) => (
                    <ArtistCard key={artist.id} artist={artist} rank={i + 1} />
                ))}
            </div>

            {artists.length === 0 && (
                <div className="text-center py-16 border border-gray-800 border-dashed mt-8">
                    <p className="text-sm text-gray-500 uppercase tracking-widest">No top artists found in database.</p>
                </div>
            )}
        </div>
    );
}
