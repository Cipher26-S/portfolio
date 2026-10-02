import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Le site est publié sur GitHub Pages sous https://cipher26-s.github.io/portfolio/
// (BASE_PATH=/ pour un hébergement à la racine, ex. Netlify ou Vercel)
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  base: command === 'build' || isPreview ? process.env.BASE_PATH ?? '/portfolio/' : '/',
}))
