import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This is your proxy configuration
      '/api/v1': {
        target: 'https://financetracker-mern.onrender.com', // Your backend URL
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // Set to true if you are using https
      },
    },
  },
  build: {
    outDir: 'dist', // Directory where the production files will be output
  },
});
