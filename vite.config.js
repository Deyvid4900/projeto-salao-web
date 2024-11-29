import {
  defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'
import {
  VitePWA
} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Faz com que o PWA seja atualizado automaticamente
      manifest: {
        name: 'HoraMarcada',
        short_name: 'HoraMar',
        description: 'Sistema de agendamento',
        theme_color: '#ff5b5b',
        background_color: '#ffffff',
        icons: [{
            src: "/icons/SalaoIcon.png" || '/assets/SalaoIcon.png' || '/SalaoIcon.png'   ,
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: "/icons/IconSalaoG.png"|| '/assets/IconSalaoG.png' || '/IconSalaoG.png' ,
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }), 
    
  ],
})