const express = require('express');
const axios = require('axios');
const router = express.Router();

const SPOTIFY_API = 'https://api.spotify.com/v1';

// Middleware: extract token from Authorization header
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Not authenticated. Please log in.' });
    }
    req.accessToken = authHeader.split(' ')[1];
    next();
}

// Generic Spotify API proxy
async function spotifyFetch(endpoint, accessToken, params = {}) {
    const response = await axios.get(`${SPOTIFY_API}${endpoint}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params,
    });
    return response.data;
}

// GET /api/me
router.get('/me', requireAuth, async (req, res) => {
    try {
        const data = await spotifyFetch('/me', req.accessToken);
        res.json(data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

// GET /api/top-tracks
router.get('/top-tracks', requireAuth, async (req, res) => {
    try {
        const { time_range = 'medium_term', limit = 20 } = req.query;
        const data = await spotifyFetch('/me/top/tracks', req.accessToken, { time_range, limit });
        res.json(data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

// GET /api/top-artists
router.get('/top-artists', requireAuth, async (req, res) => {
    try {
        const { time_range = 'medium_term', limit = 20 } = req.query;
        const data = await spotifyFetch('/me/top/artists', req.accessToken, { time_range, limit });
        res.json(data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

// GET /api/recently-played
router.get('/recently-played', requireAuth, async (req, res) => {
    try {
        const { limit = 20 } = req.query;
        const data = await spotifyFetch('/me/player/recently-played', req.accessToken, { limit });
        res.json(data);
    } catch (err) {
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

// GET /api/currently-playing
router.get('/currently-playing', requireAuth, async (req, res) => {
    try {
        const data = await spotifyFetch('/me/player/currently-playing', req.accessToken);
        res.json(data || { is_playing: false });
    } catch (err) {
        if (err.response?.status === 204) {
            return res.json({ is_playing: false });
        }
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

module.exports = router;
