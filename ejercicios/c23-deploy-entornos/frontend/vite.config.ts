import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (command === 'build' && !/^https?:\/\//.test(env.VITE_API_URL ?? '')) {
    throw new Error('Defini VITE_API_URL con la URL de la API antes de compilar el frontend.')
  }
  return {
    plugins: [react()],
    test: { environment: 'jsdom', setupFiles: './src/setupTests.ts' },
    resolve: {
      alias: {
        'react-router-dom': fileURLToPath(new URL('./src/lib/react-router-dom.tsx', import.meta.url)),
      },
    },
  }
})
