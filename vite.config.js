import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' 
    ? '/VueTailwind/' // ИМЯ ВАШЕГО РЕПОЗИТОРИЯ НА GITHUB!
    : '/',
  
  plugins: [vue(), tailwindcss()],
  
  server: process.env.NODE_ENV === 'development' ? {
    proxy: {
      '/api': {
        target: 'https://8b5e3ba06486309b.mokky.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  } : undefined,
  
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  }
})