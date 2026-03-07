/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                spotify: {
                    green: '#1DB954',
                    'green-light': '#1ed760',
                    'green-dark': '#18a34a',
                    black: '#191414',
                    'dark-1': '#121212',
                    'dark-2': '#181818',
                    'dark-3': '#282828',
                    'dark-4': '#333333',
                    'gray-1': '#535353',
                    'gray-2': '#b3b3b3',
                    'gray-3': '#a7a7a7',
                    white: '#FFFFFF',
                },
            },
            fontFamily: {
                sans: ['Inter', 'Circular', 'system-ui', '-apple-system', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-in': 'slideIn 0.3s ease-out',
                'fade-in': 'fadeIn 0.5s ease-out',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'progress': 'progress 1s ease-in-out',
                'bounce-in': 'bounceIn 0.6s ease-out',
            },
            keyframes: {
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideIn: {
                    '0%': { transform: 'translateX(-20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(29, 185, 84, 0.3)' },
                    '100%': { boxShadow: '0 0 20px rgba(29, 185, 84, 0.6)' },
                },
                progress: {
                    '0%': { width: '0%' },
                    '100%': { width: '100%' },
                },
                bounceIn: {
                    '0%': { transform: 'scale(0.3)', opacity: '0' },
                    '50%': { transform: 'scale(1.05)' },
                    '70%': { transform: 'scale(0.9)' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
}
