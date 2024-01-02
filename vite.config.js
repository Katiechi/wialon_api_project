// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/wialon-api': {
        target: 'https://hst-api.wialon.com', // Update with your server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wialon-api/, ''),
      },
    },
  },
});
