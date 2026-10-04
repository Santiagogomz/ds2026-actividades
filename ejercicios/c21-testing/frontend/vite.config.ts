import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', setupFiles: './src/setupTests.ts' },
  resolve: {
    alias: {
      'react-router-dom': fileURLToPath(new URL('./src/lib/react-router-dom.tsx', import.meta.url)),
    },
  },
})
