import React from 'react';
import { useSpotify } from '../context/SpotifyContext';
import TopBar from '../components/TopBar';
import ListeningTimeChart from '../charts/ListeningTimeChart';

export default function RecentlyPlayed() {
    const { recentlyPlayed, loading } = useSpotify();

    const timeAgo = (dateStr) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'JUST NOW';
        if (mins < 60) return `${mins}M AGO`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}H AGO`;
        return `${Math.floor(hrs / 24)}D AGO`;
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: false,
        }).toUpperCase();
    };

    if (loading) {
        return (
            <div className="font-mono text-spotify-green animate-pulse">
                {">"} FETCHING RECENT PLAYBACK LOGS...
            </div>
        );
    }

    const items = recentlyPlayed?.items || [];

    return (
        <div className="font-mono">
            <TopBar
                title="Recently Played"
                subtitle={`${items.length} Recent Logs`}
            />

            {/* Listening Time Chart */}
            <div className="mb-8 border-t border-gray-800 pt-8">
                <ListeningTimeChart recentlyPlayed={recentlyPlayed} />
            </div>

            {/* Track List */}
            <div className="border border-gray-800 bg-black mt-8">
                {/* Header */}
                <div className="grid grid-cols-[40px_1fr_1fr_120px_80px] gap-4 px-6 py-3 border-b border-gray-800 text-[10px] text-gray-400 uppercase tracking-widest bg-gray-900/30">
                    <span>IDX</span>
                    <span>T_NAME</span>
                    <span>ALBUM</span>
                    <span>LOG_TIME</span>
                    <span className="text-right">EXT_URL</span>
                </div>

                {/* Rows */}
                <div className="divide-y divide-gray-800">
                    {items.map((item, idx) => {
                        const track = item.track;
                        const imageUrl = track.album?.images?.[2]?.url || track.album?.images?.[0]?.url;

                        return (
                            <div
                                key={`${track.id}-${idx}`}
                                className="grid grid-cols-[40px_1fr_1fr_120px_80px] gap-4 px-6 py-3 items-center hover:bg-gray-900 transition-colors group"
                            >
                                {/* Index */}
                                <span className="text-sm text-gray-500 font-mono">{(idx + 1).toString().padStart(2, '0')}</span>

                                {/* Track */}
                                <div className="flex items-center gap-3 overflow-hidden">
                                    {imageUrl ? (
                                        <div className="relative flex-shrink-0 transition-all duration-300 group-hover:scale-110">
                                            <div className="absolute inset-0 border border-gray-600 group-hover:border-spotify-green transition-colors z-10 pointer-events-none"></div>
                                            <img src={imageUrl} alt={track.name} className="w-10 h-10 object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 border border-gray-800 bg-gray-900 flex items-center justify-center flex-shrink-0">
                                            <span className="text-gray-600 text-[10px] w-full text-center tracking-tighter">NULL</span>
                                        </div>
                                    )}
                                    <div className="overflow-hidden">
                                        <p className="text-xs text-gray-200 font-bold tracking-tight truncate group-hover:text-spotify-green transition-colors uppercase">
                                            {track.name}
                                        </p>
                                        <p className="text-[10px] text-gray-500 truncate uppercase mt-0.5 tracking-widest">
                                            {track.artists?.map(a => a.name).join(', ')}
                                        </p>
                                    </div>
                                </div>

                                {/* Album */}
                                <p className="text-[10px] text-gray-400 truncate uppercase tracking-widest">{track.album?.name}</p>

                                {/* Timestamp */}
                                <div>
                                    <p className="text-[10px] text-gray-300 uppercase tracking-widest group-hover:text-spotify-green transition-colors">{timeAgo(item.played_at)}</p>
                                    <p className="text-[8px] text-gray-600 mt-1 uppercase tracking-widest">{formatDate(item.played_at)}</p>
                                </div>

                                {/* External Link */}
                                <div className="text-right">
                                    <a
                                        href={track.external_urls?.spotify}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-[10px] text-gray-500 hover:text-black hover:bg-spotify-green px-2 py-1 transition-colors uppercase tracking-widest border border-gray-800 hover:border-spotify-green"
                                    >
                                        [LINK]
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {items.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">{">"} NO RECENT LOGS FOUND</p>
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest">Initiate playback on Spotify Client</p>
                    </div>
                )}
            </div>
        </div>
    );
}
