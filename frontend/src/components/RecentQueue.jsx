import React from 'react';
import { useSpotify } from '../context/SpotifyContext';
import { Clock, Music } from 'lucide-react';

export default function RecentQueue() {
    const { recentlyPlayed } = useSpotify();

    const items = recentlyPlayed?.items?.slice(0, 8) || [];

    const timeAgo = (dateStr) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    };

    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-spotify-gray-2" />
                <h3 className="text-xs font-semibold text-spotify-gray-2 uppercase tracking-wider">
                    Recent Queue
                </h3>
            </div>

            {items.length === 0 ? (
                <p className="text-xs text-spotify-gray-1 text-center py-4">No recent tracks</p>
            ) : (
                <div className="space-y-1.5">
                    {items.map((item, idx) => {
                        const track = item.track;
                        const imageUrl = track.album?.images?.[2]?.url || track.album?.images?.[0]?.url;

                        return (
                            <a
                                key={`${track.id}-${idx}`}
                                href={track.external_urls?.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={track.name}
                                        className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-md bg-spotify-dark-3 flex items-center justify-center flex-shrink-0">
                                        <Music className="w-4 h-4 text-spotify-gray-1" />
                                    </div>
                                )}
                                <div className="overflow-hidden flex-1">
                                    <p className="text-xs font-medium text-white truncate group-hover:text-spotify-green transition-colors">
                                        {track.name}
                                    </p>
                                    <p className="text-[10px] text-spotify-gray-1 truncate">
                                        {track.artists?.map(a => a.name).join(', ')}
                                    </p>
                                </div>
                                <span className="text-[10px] text-spotify-gray-1 flex-shrink-0">
                                    {timeAgo(item.played_at)}
                                </span>
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
