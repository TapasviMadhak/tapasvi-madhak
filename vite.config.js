import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/medium-feed': {
        target: 'https://medium.com',
        changeOrigin: true,
        rewrite: () => '/feed/@tapasviMadhak',
      },
    },
  },
});
