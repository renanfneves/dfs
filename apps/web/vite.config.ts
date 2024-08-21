/// <reference types="vitest" />
import path from "node:path"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    }
  },
  test: {
    globals: true,
    setupFiles: ['./src/libs/vitest/setup-test.ts'],
    environment: 'happy-dom',
  }
})
