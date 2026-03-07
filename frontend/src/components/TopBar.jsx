import React from 'react';
import { useSpotify } from '../context/SpotifyContext';
import { RefreshCw, Clock } from 'lucide-react';

const timeRangeLabels = {
    short_term: '4 Weeks',
    medium_term: '6 Months',
    long_term: 'All Time',
};

export default function TopBar({ title, subtitle }) {
    const { timeRange, setTimeRange, refreshData } = useSpotify();

    return (
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b border-gray-800 pb-8 font-mono relative">
            <div className="flex items-start gap-6">
                {/* ASCI Art Icon */}
                <pre className="hidden sm:block text-spotify-green text-[5px] xs:text-[6px] md:text-[8px] leading-[1.1] font-bold select-none drop-shadow-[0_0_8px_rgba(29,185,84,0.7)] mt-1 tracking-tighter">
                    {` ▄▄▄▄▄▄▄▄▄▄▄ 
 █ ▄▄▄▄▄▄▄ █
 █ █     █ █
 █ █▄▄▄▄▄█ █
 █▄▄▄▄▄▄▄▄▄█
   ▀▀▀▀▀▀▀   `}
                </pre>
                <div>
                    <h1 className="text-xl md:text-3xl font-black text-gray-200 tracking-widest uppercase mb-1" style={{ textShadow: "2px 2px 0 #1DB954, -1px -1px 0 #191414" }}>
                        {title}
                    </h1>
                    {subtitle &&
                        <div className="flex items-center gap-3 mt-2 pl-1">
                            <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest leading-none m-0">{subtitle}</p>
                        </div>
                    }
                </div>
            </div>

            <div className="flex items-center gap-2 mt-8 md:mt-0 text-xs text-right">
                {/* Time Range Picker */}
                <div className="flex items-center gap-1">
                    <span className="text-gray-600 mr-2">RANGE:</span>
                    {Object.entries(timeRangeLabels).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setTimeRange(key)}
                            className={`tracking-widest transition-all px-3 py-1 border uppercase ${timeRange === key
                                ? 'text-spotify-green font-bold border-transparent'
                                : 'text-gray-500 border-transparent hover:text-spotify-green hover:border-spotify-green hover:bg-spotify-green/10'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Refresh Button */}
                <button
                    onClick={refreshData}
                    className="px-3 py-1 border border-transparent text-gray-500 hover:text-spotify-green hover:border-spotify-green hover:bg-spotify-green/10 transition-all ml-2 uppercase tracking-widest"
                    title="Refresh data"
                >
                    REFRESH
                </button>
            </div>
        </div>
    );
}
