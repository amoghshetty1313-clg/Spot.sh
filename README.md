# spot.sh 🎵

A sleek, privacy-focused terminal-style dashboard for your Spotify listening analytics. Built with React, Vite, and Node.js.

## 🚀 Quick Setup Guide

To get **spot.sh** running locally, follow these exact steps to set up your Spotify credentials.

### 1. Get Your Spotify API Keys
1.  Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2.  Log in with your Spotify account.
3.  Click **Create app**.
4.  **App name**: `spot.sh` (or anything you like).
5.  **App description**: "My personal analytics terminal".
6.  **Redirect URIs**: You **MUST** add this exactly: `http://localhost:5000/callback`
7.  Check the boxes for API/SDK and Web API.
8.  Click **Save**.
9.  Inside your new app, click **Settings**.
10. Copy your **Client ID** and **Client Secret**.

### 2. Configure Environment Variables
1.  Navigate to the `backend` folder.
2.  Create a new file named `.env` (or rename `.env.example`).
3.  Paste your keys into the file like this:
    ```env
    SPOTIFY_CLIENT_ID=your_client_id_here
    SPOTIFY_CLIENT_SECRET=your_client_secret_here
    SESSION_SECRET=create_any_random_string_here
    FRONTEND_URL=http://localhost:5173
    PORT=5000
    ```

### 3. Installation & Launch

**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Now open [http://localhost:5173](http://localhost:5173) in your browser and click **Connect with Spotify**.

---

## 🛠️ Tech Stack
-   **Frontend**: React, Tailwind CSS, Recharts, Vite
-   **Backend**: Node.js, Express, Spotify Web API (OAuth 2.0)

## 🔒 Privacy
-   **Zero Data Storage**: We do not store your Spotify data.
-   **Local Only**: Your API keys stay on your machine (via the `.env` file).
-   **Direct API**: All data is fetched directly from Spotify to your browser.
