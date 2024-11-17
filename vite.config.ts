import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      VITE_DATABASE_URL: JSON.stringify(process.env.VITE_DATABASE_URL),
      // Add other env variables you need
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  }
});