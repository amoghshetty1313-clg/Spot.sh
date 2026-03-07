import React from 'react';
import { useSpotify } from '../context/SpotifyContext';

export default function Login() {
    const { isAuthenticated } = useSpotify();

    // If already logged in, redirect
    if (isAuthenticated) {
        window.location.href = '/dashboard';
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-gray-300 font-mono flex items-center justify-center p-4 selection:bg-green-500 selection:text-black">
            <div className="w-full max-w-2xl border border-gray-800 p-8 relative bg-black/50 backdrop-blur-sm">

                {/* Terminal Window Header */}
                <div className="absolute top-0 left-0 w-full border-b border-gray-800 flex items-center px-4 py-2">
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full border border-gray-600"></div>
                        <div className="w-2 h-2 rounded-full border border-gray-600"></div>
                        <div className="w-2 h-2 rounded-full border border-gray-600"></div>
                    </div>
                    <span className="mx-auto text-[10px] text-gray-500 tracking-widest">
                        auth_terminal.exe
                    </span>
                </div>

                {/* Decorative border corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-spotify-green"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-spotify-green"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-spotify-green"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-spotify-green"></div>

                <div className="text-center mt-12 mb-12 flex flex-col items-center">
                    <pre className="text-spotify-green text-[10px] md:text-sm leading-tight text-left mb-6 font-bold italic select-none whitespace-pre drop-shadow-[0_0_8px_rgba(29,185,84,0.5)]">
                        {`
  ____  ____   ___  _____     ____  _   _ 
 / ___||  _ \\ / _ \\|_   _|   / ___|| | | |
 \\___ \\| |_) | | | | | |     \\___ \\| |_| |
  ___) |  __/| |_| | | |  _   ___) |  _  |
 |____/|_|    \\___/  |_| (_) |____/|_| |_|
`}
                    </pre>
                    <p className="text-gray-500 text-sm tracking-widest uppercase mb-2">
                        -- spot.sh Terminal --
                    </p>
                    <div className="text-gray-400 text-xs w-full max-w-sm mx-auto text-left mt-4 border-l border-gray-800 pl-4 py-2">
                        <p className="mb-1">{">"} initializing secure connection...</p>
                        <p className="mb-1">{">"} awaiting user authorization</p>
                        <p className="text-gray-600 animate-pulse">{">"} _</p>
                    </div>
                </div>

                <div className="flex justify-center mb-8">
                    <a
                        href="/login"
                        className="group relative inline-block px-8 py-3 border border-spotify-green text-spotify-green hover:bg-spotify-green hover:text-black transition-colors duration-200 uppercase tracking-widest text-sm font-bold"
                    >
                        <span className="absolute -top-[10px] left-4 bg-black px-2 text-[10px] text-gray-500 group-hover:text-black group-hover:bg-spotify-green transition-colors">
                            SYS.AUTH.REQ
                        </span>
                        [ CONNECT WITH SPOTIFY ]
                    </a>
                </div>

                <div className="border-t border-gray-800 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600">
                    <div className="flex items-center">
                        <span className="text-red-500 mr-2">*</span>
                        READ-ONLY ACCESS IS GRANTED. NO DATA STORED.
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0 opacity-50">
                        <span>{">"} TRK_ANLYZ</span>
                        <span>{">"} ART_ANLYZ</span>
                        <span>{">"} GNR_ANLYZ</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
