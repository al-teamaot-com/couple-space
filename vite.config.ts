import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      process: path.resolve(__dirname, 'src/process.ts'),
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  }
});
});