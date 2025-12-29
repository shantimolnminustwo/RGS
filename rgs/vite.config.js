import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/ss
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: '/rgs/',
})
