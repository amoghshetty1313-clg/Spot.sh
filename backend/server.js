require('dotenv').config();
const express = require('express');
const cors = require('cors');

const spotifyAuth = require('./spotifyAuth');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Simple CORS setup allowing the Vite frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// Mount the authentication flow at root
app.use('/', spotifyAuth);

// Mount API proxies
app.use('/api', apiRoutes);

// Simple health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🎵 Spotify Dash Backend listening on http://localhost:${PORT}`);
});
