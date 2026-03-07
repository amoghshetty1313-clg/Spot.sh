const API_BASE = '/api';

function getToken() {
    return localStorage.getItem('spotify_access_token');
}

export function setTokens(accessToken, refreshToken, expiresIn) {
    localStorage.setItem('spotify_access_token', accessToken);
    localStorage.setItem('spotify_refresh_token', refreshToken);
    localStorage.setItem('spotify_token_expiry', (Date.now() + expiresIn * 1000).toString());
}

export function clearTokens() {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_expiry');
}

export function isAuthenticated() {
    const token = getToken();
    const expiry = localStorage.getItem('spotify_token_expiry');
    return !!(token && expiry && Date.now() < parseInt(expiry));
}

async function fetchJSON(url) {
    const token = getToken();
    if (!token) throw new Error('UNAUTHORIZED');

    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
        throw new Error('UNAUTHORIZED');
    }
    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }
    return res.json();
}

export async function getMe() {
    return fetchJSON(`${API_BASE}/me`);
}

export async function getTopTracks(timeRange = 'medium_term', limit = 20) {
    return fetchJSON(`${API_BASE}/top-tracks?time_range=${timeRange}&limit=${limit}`);
}

export async function getTopArtists(timeRange = 'medium_term', limit = 20) {
    return fetchJSON(`${API_BASE}/top-artists?time_range=${timeRange}&limit=${limit}`);
}

export async function getRecentlyPlayed(limit = 20) {
    return fetchJSON(`${API_BASE}/recently-played?limit=${limit}`);
}

export async function getCurrentlyPlaying() {
    return fetchJSON(`${API_BASE}/currently-playing`);
}

export function getLoginUrl() {
    return '/login';
}
