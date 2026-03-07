import React from 'react';

export default function TrackCard({ track, rank }) {
    if (!track) return null;

    return (
        <a
            href={track.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-800 bg-black p-3 hover:border-spotify-green hover:bg-spotify-green/5 transition-colors group"
        >
            <div className="flex items-center gap-4 font-mono">
                {/* Rank */}
                <span className="text-gray-600 min-w-[20px] text-right font-bold w-6">
                    {rank}.
                </span>

                {/* Cover Art Box */}
                <div className="w-10 h-10 border border-gray-700 bg-gray-900 flex items-center justify-center shrink-0 group-hover:border-spotify-green transition-colors relative overflow-hidden">
                    {track.album?.images?.[0]?.url ? (
                        <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-110">
                            <img src={track.album.images[0].url} alt="" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <span className="text-gray-700">?</span>
                    )}
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-200 truncate group-hover:text-spotify-green transition-colors">
                        {track.name}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate mt-1 tracking-wider uppercase">
                        {track.artists?.map(a => a.name).join(', ')}
                    </p>
                </div>
            </div>
        </a>
    );
}
