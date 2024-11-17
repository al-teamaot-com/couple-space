import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'qrcode.react': 'qrcode.react/lib/index.js'
    }
  },
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      DATABASE_URL: JSON.stringify(process.env.DATABASE_URL || ''),
    }
  }
});