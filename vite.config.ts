import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.DATABASE_URL': JSON.stringify(env.DATABASE_URL || ''),
      'process.env.NODE_ENV': JSON.stringify(mode)
    }
  };
});