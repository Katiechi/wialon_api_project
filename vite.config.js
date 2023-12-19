import { defineConfig } from 'vite';
import React from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    React(),
  ],
  server: {
    proxy: {
      '/wialon': {
        target: 'https://hst-api.wialon.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wialon/, ''),
      },
    },
  },
});
