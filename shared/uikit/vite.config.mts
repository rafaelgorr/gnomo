import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({ compiler: true }),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: './package.json',
          dest: '.',
        },
        {
          src: './src/assets',
          dest: './src',
        },
        {
          src: './src/lib',
          dest: './src',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: resolve(import.meta.dirname, './index.ts'),
      formats: ['es'],
      fileName: (ext, entryName) => `${entryName}.${ext}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        inlineDynamicImports: false,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    target: 'esnext',
    sourcemap: true,
  },
})
