import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSpotify } from '../context/SpotifyContext';

const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/top-tracks', label: 'Top Tracks' },
    { path: '/top-artists', label: 'Top Artists' },
    { path: '/recently-played', label: 'Recently Played' },
];

export default function Sidebar() {
    const { user, logout } = useSpotify();

    return (
        <aside className="w-64 min-h-screen bg-black flex flex-col border-r border-gray-800 font-mono text-gray-300">
            {/* Logo / Header */}
            <div className="p-6 border-b border-gray-800">
                <div className="p-6">
                    <pre className="text-spotify-green text-[7px] leading-tight font-bold italic whitespace-pre select-none drop-shadow-[0_0_2px_rgba(29,185,84,0.5)]">
                        {`  ____  ____   ___  _____     ____  _   _ 
 / ___||  _ \\ / _ \\|_   _|   / ___|| | | |
 \\___ \\| |_) | | | | | |     \\___ \\| |_| |
  ___) |  __/| |_| | | |  _   ___) |  _  |
 |____/|_|    \\___/  |_| (_) |____/|_| |_|`}
                    </pre>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-3 border-t border-gray-800 pt-2 inline-block w-full">
                    {">"} v2.0_terminal
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6">
                <ul className="space-y-2">
                    {navItems.map(({ path, label }) => (
                        <li key={path}>
                            <NavLink
                                to={path}
                                className={({ isActive }) =>
                                    `block text-sm px-4 py-2 transition-all border ${isActive
                                        ? 'text-spotify-green font-bold border-transparent'
                                        : 'text-gray-500 border-transparent hover:text-spotify-green hover:border-spotify-green hover:bg-spotify-green/10'
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User Profile */}
            {user && (
                <div className="p-6 border-t border-gray-800 text-xs">
                    <div className="space-y-3 text-gray-500">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 border border-gray-800 flex-shrink-0 bg-gray-900 flex items-center justify-center p-0.5">
                                {user.images?.[0]?.url ? (
                                    <img src={user.images[0].url} alt="Profile" className="w-full h-full object-cover grayscale-[20%]" />
                                ) : (
                                    <span className="text-[10px] text-gray-600">INT</span>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-300 truncate max-w-[120px] font-bold">{user.display_name}</span>
                                <span className={`text-[10px] uppercase ${user.product === 'premium' ? 'text-spotify-green/70' : 'text-red-400/70'}`}>
                                    {user.product || 'Free'}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between border-t border-gray-800 pt-2 text-[10px] uppercase tracking-wider">
                            <span>Region:</span>
                            <span className="text-gray-400">{user?.country || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Logout */}
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={logout}
                    className="w-full text-left text-xs text-gray-600 hover:text-red-400 uppercase tracking-widest transition-colors before:content-['['] after:content-[']'] hover:before:text-red-400 hover:after:text-red-400 flex justify-between"
                >
                    <span>SYS.LOGOUT</span>
                </button>
            </div>
        </aside>
    );
}
