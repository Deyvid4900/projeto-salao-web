import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Faz com que o PWA seja atualizado automaticamente
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot|otf|json|js|css)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets',
              expiration: {
                maxEntries: 100,
              },
            },
          },
        ],
      },
      manifest: {
        name: 'HoraMarcada',
        short_name: 'HoraMar',
        description: 'Sistema de agendamento',
        theme_color: '#ff5b5b',
        background_color: '#ffffff',
        icons: [
          {
            src: '/assets/SalaoIcon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/IconSalaoG.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
