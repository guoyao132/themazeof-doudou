import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import type {ConfigEnv} from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig(({mode}: ConfigEnv) => {
  return {
    base: './',
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    build:{
      // minify: 'terser',
      // chunkSizeWarningLimit: 2000,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  }
})
