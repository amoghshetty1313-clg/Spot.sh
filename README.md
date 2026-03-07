# spot.sh

A sleek, privacy-focused terminal-style dashboard for your Spotify listening analytics. Built with React, Vite, and Node.js.

![Dashboard Preview](frontend/public/preview.png)

## Overview

spot.sh transforms your Spotify data into a high-fidelity terminal interface. It provides detailed insights into your listening habits without the clutter of traditional analytics tools.

### Key Features
- **Real-Time Analytics**: Monitor your top tracks, artists, and recent listening activity with low-latency updates.
- **Deep Insights**: Visualizations for genre distribution and peak listening hours.
- **Privacy First**: No third-party tracking or data storage. All analytics are generated on-the-fly from the Spotify API.
- **Custom Terminal UI**: A unique monospace aesthetic featuring ASCII art and a responsive "main-frame" inspired layout.

## Tech Stack
- **Frontend**: React, Tailwind CSS, Recharts, Vite
- **Backend**: Node.js, Express, Spotify Web API (OAuth 2.0)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- A Spotify Developer account and App credentials.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/spot.sh.git
   cd spot.sh
   ```

2. **Backend Configuration**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Open .env and add your SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET
   npm start
   ```

3. **Frontend Configuration**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Launch**
   Access the dashboard at `http://localhost:5173`.

## Deployment

Ensure `FRONTEND_URL` and `PORT` are correctly configured in your production environment variables. The application is designed to be easily containerized or deployed to platforms like Vercel or Heroku.

## License
MIT
