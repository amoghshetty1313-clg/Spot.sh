import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer,
} from 'recharts';

export default function ListeningTimeChart({ recentlyPlayed }) {
    if (!recentlyPlayed?.items?.length) return null;

    // Bucket recent plays by hour of day
    const hourBuckets = Array(24).fill(0);
    recentlyPlayed.items.forEach(item => {
        const hour = new Date(item.played_at).getHours();
        hourBuckets[hour]++;
    });

    const data = hourBuckets.map((count, hour) => ({
        hour: `${hour.toString().padStart(2, '0')}:00`,
        tracks: count,
        label: hour < 6 ? 'LATE_NIGHT' :
            hour < 12 ? 'MORNING' :
                hour < 17 ? 'AFTERNOON' :
                    hour < 21 ? 'EVENING' : 'NIGHT',
    }));

    const CustomTooltip = ({ active, payload }) => {
        if (!active || !payload?.length) return null;
        const d = payload[0].payload;
        return (
            <div className="bg-black border border-spotify-green p-3 font-mono">
                <p className="text-[10px] font-bold text-spotify-green uppercase tracking-widest border-b border-gray-800 pb-1 mb-2">T_{d.hour}</p>
                <p className="text-[10px] text-gray-500 mb-1">{">"} {d.label}</p>
                <p className="text-[10px] text-gray-300">TRACKS: {d.tracks}</p>
            </div>
        );
    };

    return (
        <div className="border border-gray-800 bg-black p-6 font-mono relative group hover:border-spotify-green transition-colors">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-600 group-hover:border-spotify-green transition-colors"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-600 group-hover:border-spotify-green transition-colors"></div>

            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-6 border-b border-gray-800 pb-2">Listening Activity</h3>

            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="monoGreen" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1DB954" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#1DB954" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" stroke="#1f2937" vertical={false} />
                    <XAxis
                        dataKey="hour"
                        tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'monospace' }}
                        interval={2}
                        axisLine={{ stroke: '#374151' }}
                    />
                    <YAxis
                        tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'monospace' }}
                        allowDecimals={false}
                        axisLine={{ stroke: '#374151' }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#374151', strokeWidth: 1, strokeDasharray: '2 2' }} />
                    <Area
                        type="step"
                        dataKey="tracks"
                        stroke="#1DB954"
                        strokeWidth={1}
                        fill="url(#monoGreen)"
                        animationDuration={800}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
