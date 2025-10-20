import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
 
  resolve: {
    alias: {
      // Optional: alias for imports, e.g. '@' to 'src'
      '@': '/src',
    },
  },
});
