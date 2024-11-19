import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  define: {
    process: {
      env: {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
        DATABASE_URL: JSON.stringify(process.env.DATABASE_URL || ''),
      }
    }
  }
});