import React from 'react';
import { useSpotify } from '../context/SpotifyContext';
import { Music2, Pause, Volume2 } from 'lucide-react';

export default function CurrentlyPlayingWidget() {
    const { currentlyPlaying } = useSpotify();

    if (!currentlyPlaying || !currentlyPlaying.item) {
        return (
            <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                    <div className="pulse-dot" />
                    <h3 className="text-xs font-semibold text-spotify-gray-2 uppercase tracking-wider">
                        Now Playing
                    </h3>
                </div>
                <div className="flex flex-col items-center py-6 text-center">
                    <div className="w-16 h-16 rounded-xl bg-spotify-dark-3 flex items-center justify-center mb-3">
                        <Music2 className="w-8 h-8 text-spotify-gray-1" />
                    </div>
                    <p className="text-sm text-spotify-gray-2">Nothing playing right now</p>
                    <p className="text-xs text-spotify-gray-1 mt-1">Play something on Spotify to see it here</p>
                </div>
            </div>
        );
    }

    const track = currentlyPlaying.item;
    const isPlaying = currentlyPlaying.is_playing;
    const progress = currentlyPlaying.progress_ms || 0;
    const duration = track.duration_ms || 1;
    const progressPercent = (progress / duration) * 100;
    const imageUrl = track.album?.images?.[0]?.url;

    const formatTime = (ms) => {
        const min = Math.floor(ms / 60000);
        const sec = Math.floor((ms % 60000) / 1000);
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="glass rounded-2xl p-5 glow-green-sm">
            <div className="flex items-center gap-2 mb-4">
                <div className="pulse-dot" />
                <h3 className="text-xs font-semibold text-spotify-green uppercase tracking-wider">
                    {isPlaying ? 'Now Playing' : 'Paused'}
                </h3>
                {isPlaying && <Volume2 className="w-3 h-3 text-spotify-green ml-auto animate-pulse" />}
            </div>

            {/* Album Art */}
            <div className="relative mb-4">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={track.name}
                        className={`w-full aspect-square rounded-xl object-cover shadow-xl ${isPlaying ? 'glow-green' : ''
                            }`}
                    />
                ) : (
                    <div className="w-full aspect-square rounded-xl bg-spotify-dark-3 flex items-center justify-center">
                        <Music2 className="w-16 h-16 text-spotify-gray-1" />
                    </div>
                )}

                {/* Playing/Paused Indicator */}
                <div className="absolute bottom-3 right-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isPlaying ? 'bg-spotify-green' : 'bg-white/20 backdrop-blur-sm'
                        }`}>
                        {isPlaying ? (
                            <div className="flex items-center gap-[2px]">
                                {[1, 2, 3].map(i => (
                                    <div
                                        key={i}
                                        className="w-[3px] bg-black rounded-full"
                                        style={{
                                            height: `${8 + Math.random() * 8}px`,
                                            animation: `pulse ${0.5 + i * 0.2}s ease-in-out infinite alternate`,
                                        }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Pause className="w-4 h-4 text-white" />
                        )}
                    </div>
                </div>
            </div>

            {/* Track Info */}
            <h4 className="text-sm font-bold text-white truncate">{track.name}</h4>
            <p className="text-xs text-spotify-gray-2 truncate mt-1">
                {track.artists?.map(a => a.name).join(', ')}
            </p>
            <p className="text-xs text-spotify-gray-1 truncate mt-0.5">{track.album?.name}</p>

            {/* Progress */}
            <div className="mt-4">
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
                </div>
                <div className="flex justify-between mt-1.5">
                    <span className="text-[10px] text-spotify-gray-1">{formatTime(progress)}</span>
                    <span className="text-[10px] text-spotify-gray-1">{formatTime(duration)}</span>
                </div>
            </div>
        </div>
    );
}
