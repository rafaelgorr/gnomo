import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    resolve: { tsconfigPaths: true },
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
      babel({ presets: [reactCompilerPreset()] }),
    ],
    server: {
      port: 3030,
      allowedHosts: true,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: env.VITE_GNOMO_API_URL,
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 3030,
    },
    build: {
      sourcemap: true,
      chunkSizeWarningLimit: 3000,
    },
  }
})
