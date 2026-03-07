import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        proxy: {
            '/api': 'http://localhost:5000',
            '/login': 'http://localhost:5000',
            '/callback': 'http://localhost:5000',
            '/auth': 'http://localhost:5000',
            '/logout': 'http://localhost:5000',
            '/refresh': 'http://localhost:5000',
        },
    },
})
