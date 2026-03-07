import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as spotifyApi from '../api/spotify';

const SpotifyContext = createContext(null);

export function SpotifyProvider({ children }) {
    const [user, setUser] = useState(null);
    const [topTracks, setTopTracks] = useState(null);
    const [topArtists, setTopArtists] = useState(null);
    const [recentlyPlayed, setRecentlyPlayed] = useState(null);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [premiumRequired, setPremiumRequired] = useState(false);
    const [timeRange, setTimeRange] = useState('medium_term');

    // On mount: check for tokens in URL hash (from OAuth callback) or localStorage
    useEffect(() => {
        // Check URL hash for tokens (after OAuth redirect)
        const hash = window.location.hash.substring(1);
        if (hash) {
            const params = new URLSearchParams(hash);
            const accessToken = params.get('access_token');
            const refreshToken = params.get('refresh_token');
            const expiresIn = params.get('expires_in');

            if (accessToken) {
                spotifyApi.setTokens(accessToken, refreshToken, parseInt(expiresIn));
                // Clean URL hash
                window.history.replaceState(null, '', window.location.pathname);
            }
        }

        // Check if we have valid tokens
        if (spotifyApi.isAuthenticated()) {
            setAuthenticated(true);
        } else {
            setLoading(false);
        }
    }, []);

    const loadAllData = useCallback(async () => {
        setLoading(true);
        setPremiumRequired(false);
        try {
            const [me, tracks, artists, recent] = await Promise.allSettled([
                spotifyApi.getMe(),
                spotifyApi.getTopTracks(timeRange, 50),
                spotifyApi.getTopArtists(timeRange, 50),
                spotifyApi.getRecentlyPlayed(50),
            ]);

            // Check if any request failed due to 403 (Premium Required)
            const unauthorized = [me, tracks, artists, recent].some(res =>
                res.status === 'rejected' && res.reason.message.includes('403')
            );

            if (unauthorized) {
                setPremiumRequired(true);
            }

            if (me.status === 'fulfilled') setUser(me.value);
            if (tracks.status === 'fulfilled') setTopTracks(tracks.value);
            if (artists.status === 'fulfilled') setTopArtists(artists.value);
            if (recent.status === 'fulfilled') setRecentlyPlayed(recent.value);
        } catch (err) {
            console.error('Failed to load data:', err);
            if (err.message === 'UNAUTHORIZED' || err.message.includes('401')) {
                spotifyApi.clearTokens();
                setAuthenticated(false);
            }
        }
        setLoading(false);
    }, [timeRange]);

    // Load data when authenticated
    useEffect(() => {
        if (authenticated) {
            loadAllData();
        }
    }, [authenticated, loadAllData]);

    // Poll currently playing every 10 seconds
    useEffect(() => {
        if (!authenticated) return;

        const pollNowPlaying = async () => {
            try {
                const data = await spotifyApi.getCurrentlyPlaying();
                setCurrentlyPlaying(data);
            } catch (err) {
                // ignore
            }
        };

        pollNowPlaying();
        const interval = setInterval(pollNowPlaying, 10000);
        return () => clearInterval(interval);
    }, [authenticated]);

    // Re-fetch when time range changes
    useEffect(() => {
        if (authenticated) {
            loadAllData();
        }
    }, [timeRange, authenticated, loadAllData]);

    const logout = () => {
        spotifyApi.clearTokens();
        setAuthenticated(false);
        setUser(null);
        window.location.href = '/';
    };

    const value = {
        user,
        topTracks,
        topArtists,
        recentlyPlayed,
        currentlyPlaying,
        isAuthenticated: authenticated,
        premiumRequired,
        loading,
        timeRange,
        setTimeRange,
        refreshData: loadAllData,
        logout,
    };

    return (
        <SpotifyContext.Provider value={value}>
            {children}
        </SpotifyContext.Provider>
    );
}

export function useSpotify() {
    const context = useContext(SpotifyContext);
    if (!context) {
        throw new Error('useSpotify must be used within a SpotifyProvider');
    }
    return context;
}
