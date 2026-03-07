import React from 'react';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';

export default function GenreDistributionChart({ artists }) {
    if (!artists?.items?.length) return null;

    // Count genres
    const genreCount = {};
    artists.items.forEach(artist => {
        artist.genres?.forEach(genre => {
            genreCount[genre] = (genreCount[genre] || 0) + 1;
        });
    });

    const data = Object.entries(genreCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([name, value]) => ({
            name: name.toUpperCase(),
            value,
        }));

    if (data.length === 0) return null;

    const CustomTooltip = ({ active, payload }) => {
        if (!active || !payload?.length) return null;
        return (
            <div className="bg-black border border-spotify-green p-3 font-mono">
                <p className="text-[10px] font-bold text-spotify-green uppercase tracking-widest border-b border-gray-800 pb-1 mb-2">{payload[0].name}</p>
                <p className="text-[10px] text-gray-400">ARTISTS: {payload[0].value}</p>
            </div>
        );
    };

    const renderLabel = ({ name, percent }) => {
        if (percent < 0.05) return '';
        return `[ ${name} ${(percent * 100).toFixed(0)}% ]`;
    };

    return (
        <div className="border border-gray-800 bg-black p-6 font-mono relative group hover:border-spotify-green transition-colors">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-600 group-hover:border-spotify-green transition-colors"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-600 group-hover:border-spotify-green transition-colors"></div>

            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-6 border-b border-gray-800 pb-2">Genre Distribution</h3>

            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        stroke="#000000"
                        strokeWidth={2}
                        paddingAngle={1}
                        dataKey="value"
                        animationDuration={800}
                        label={renderLabel}
                        labelLine={{ stroke: '#374151', strokeWidth: 1 }}
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill="#1DB954"
                                fillOpacity={1 - (index * 0.08)}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
