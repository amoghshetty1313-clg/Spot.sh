import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SpotifyProvider, useSpotify } from './context/SpotifyContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TopTracks from './pages/TopTracks';
import TopArtists from './pages/TopArtists';
import RecentlyPlayed from './pages/RecentlyPlayed';

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useSpotify();

    if (loading) {
        return (
            <div className="min-h-screen bg-spotify-dark-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-spotify-green border-t-transparent rounded-full animate-spin" />
                    <p className="text-spotify-gray-2 text-sm">Loading your Spotify data...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Layout>{children}</Layout>;
}

function App() {
    return (
        <SpotifyProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/top-tracks" element={<ProtectedRoute><TopTracks /></ProtectedRoute>} />
                    <Route path="/top-artists" element={<ProtectedRoute><TopArtists /></ProtectedRoute>} />
                    <Route path="/recently-played" element={<ProtectedRoute><RecentlyPlayed /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </SpotifyProvider>
    );
}

export default App;
