import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': '/src',
    },
  },

  server: {
    historyApiFallback: true, // 👈 this fixes React Router refresh 404
  },
});
