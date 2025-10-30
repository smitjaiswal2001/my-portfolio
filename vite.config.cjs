// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    // Point to the new .cjs extension for your PostCSS config
    postcss: './postcss.config.cjs',
  },
});