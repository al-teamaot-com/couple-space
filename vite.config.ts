import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_ENV__: JSON.stringify(process.env.APP_ENV),
  },
  envPrefix: 'VITE_'
});