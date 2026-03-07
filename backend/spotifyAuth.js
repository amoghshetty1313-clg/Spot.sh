const express = require('express');
const axios = require('axios');
const router = express.Router();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:5000/callback';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const SCOPES = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-read-recently-played',
    'user-read-currently-playing',
].join(' ');

// 1. Send user to Spotify to log in
router.get('/login', (req, res) => {
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPES,
        redirect_uri: REDIRECT_URI,
        show_dialog: 'true', // Force show the login dialog so it resets
    });
    res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
});

// 2. Spotify redirects here after user logs in
router.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    const error = req.query.error || null;

    if (error) {
        console.error('Spotify Auth Error:', error);
        return res.redirect(`${FRONTEND_URL}?error=${error}`);
    }

    try {
        const authHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
        };

        const payload = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
        });

        // Exchange the code for an access token
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', payload.toString(), {
            headers: authHeaders,
        });

        const { access_token, refresh_token, expires_in } = tokenResponse.data;

        // Build the redirect URL with tokens attached so the React app can grab them
        const redirectParams = new URLSearchParams({
            access_token,
            refresh_token,
            expires_in,
        });

        // Send them back to the frontend!
        res.redirect(`${FRONTEND_URL}/dashboard#${redirectParams.toString()}`);
    } catch (err) {
        console.error('Token Exchange Error:', err.response ? err.response.data : err.message);
        res.redirect(`${FRONTEND_URL}?error=invalid_token`);
    }
});

// 3. Refresh token when it expires
router.post('/refresh', async (req, res) => {
    const { refresh_token } = req.body;
    if (!refresh_token) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    try {
        const authHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
        };

        const payload = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        });

        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', payload.toString(), {
            headers: authHeaders,
        });

        res.json(tokenResponse.data);
    } catch (err) {
        console.error('Refresh Error:', err.response ? err.response.data : err.message);
        res.status(500).json({ error: 'Failed to refresh token' });
    }
});

module.exports = router;
