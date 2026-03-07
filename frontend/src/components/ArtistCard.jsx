import React from 'react';

export default function ArtistCard({ artist, rank }) {
    if (!artist) return null;

    const imageUrl = artist.images?.[0]?.url;
    const genres = artist.genres?.slice(0, 3).join(', ');

    return (
        <a
            href={artist.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-800 bg-black p-4 hover:border-spotify-green hover:bg-spotify-green/5 transition-colors group relative font-mono text-gray-300"
        >
            {/* Rank Badge */}
            <div className="absolute top-2 right-2 text-[10px] text-gray-500 font-bold group-hover:text-spotify-green transition-colors">
                [{rank}]
            </div>

            <div className="flex flex-col items-center">
                {/* Artist Image (Square, full color) */}
                <div className="w-24 h-24 mb-4 border border-gray-700 bg-gray-900 group-hover:border-spotify-green transition-colors relative overflow-hidden">
                    {imageUrl ? (
                        <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-110">
                            <img src={imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-full h-full">
                            <span className="text-gray-700">?</span>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="text-center w-full">
                    <p className="text-sm font-bold text-gray-200 truncate group-hover:text-spotify-green transition-colors mb-1">
                        {artist.name}
                    </p>

                    {genres && (
                        <p className="text-[10px] text-gray-500 truncate mb-3 tracking-wider uppercase">
                            {genres}
                        </p>
                    )}

                    {/* Stats */}
                    <div className="border-t border-gray-800 pt-3 flex justify-between w-full text-[10px]">
                        <div>
                            <span className="text-gray-600 block mb-0.5">FLW</span>
                            <span className="text-gray-400">
                                {artist.followers?.total >= 1000000
                                    ? `${(artist.followers.total / 1000000).toFixed(1)}M`
                                    : artist.followers?.total >= 1000
                                        ? `${(artist.followers.total / 1000).toFixed(1)}K`
                                        : artist.followers?.total || '--'}
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-600 block mb-0.5">POP</span>
                            <span className="text-spotify-green">{artist.popularity || '--'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}
