import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), TanStackRouterVite({})],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
