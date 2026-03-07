import React from 'react';

export default function StatsCard({ label, value, subtitle }) {
    return (
        <div className="border border-gray-800 bg-black p-4 font-mono text-gray-300 relative group hover:border-spotify-green transition-colors">
            {/* Minimal corner accents */}
            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-gray-600 group-hover:border-spotify-green transition-colors"></div>
            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-gray-600 group-hover:border-spotify-green transition-colors"></div>

            <div className="mb-4">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">{`[ ${label} ]`}</span>
            </div>

            <p className="text-xl font-bold text-spotify-green mb-1">{value}</p>
            {subtitle && <p className="text-[10px] text-gray-600 uppercase tracking-widest">{`> ${subtitle}`}</p>}
        </div>
    );
}
