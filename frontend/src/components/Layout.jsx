import React from 'react';
import Sidebar from './Sidebar';
import CurrentlyPlayingWidget from './CurrentlyPlayingWidget';
import RecentQueue from './RecentQueue';

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen bg-spotify-dark-1">
            {/* Left Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 max-h-screen">
                {children}
            </main>

            {/* Right Panel */}
            <aside className="w-80 min-h-screen bg-spotify-black/50 border-l border-white/5 p-5 overflow-y-auto max-h-screen hidden xl:block">
                <CurrentlyPlayingWidget />
                <div className="mt-6">
                    <RecentQueue />
                </div>
            </aside>
        </div>
    );
}
