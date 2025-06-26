import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteSitemap from 'vite-plugin-sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteSitemap({
      hostname: 'https://yourdomain.com', // Hardcode your domain here
      routes: [
        { path: '/', lastmod: new Date().toISOString() },
        { path: '/about', lastmod: new Date().toISOString() },
        { path: '/gallery', lastmod: new Date().toISOString() },
        { path: '/pricing', lastmod: new Date().toISOString() },
        { path: '/contact', lastmod: new Date().toISOString() },
        { path: '/login', lastmod: new Date().toISOString() },
        { path: '/register', lastmod: new Date().toISOString() },
        { path: '/forgot-password', lastmod: new Date().toISOString() },
        { path: '/profile', lastmod: new Date().toISOString() },
      ]
    }),
  ],
})