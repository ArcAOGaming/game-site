import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: '$GAME',
        short_name: '$GAME',
        description: 'Experience next-generation blockchain gaming where you truly own your in-game assets, grow their value with the ecosystem, create immersive worlds, and earn by playing and streaming.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'game-token.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'game-token.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3 MiB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/ar\.io\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ar-io-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'analytics': ['react-ga4'],
          'ao-sdk': ['ao-js-sdk'],
          'ao-connect': ['@permaweb/aoconnect'],
          // 'arweave': ['arweave'],
          'rxjs': ['rxjs'],
          'wallet-vendor': ['@reown/appkit', '@reown/appkit-adapter-wagmi'],
          // 'crypto-vendor': ['ethers', 'viem', 'wagmi'],
          // 'query-vendor': ['@tanstack/react-query'],
          'ui-vendor': ['@fortawesome/fontawesome-svg-core', '@fortawesome/free-brands-svg-icons', '@fortawesome/free-regular-svg-icons', '@fortawesome/free-solid-svg-icons', '@fortawesome/react-fontawesome']
        }
      },
    },
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // // Generate sourcemaps for production
    // sourcemap: true,
    // Optimize CSS
    cssCodeSplit: true,
    // Enable asset optimization
    assetsInlineLimit: 4096,
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  // Enable SWC minification
  esbuild: {
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  },
  // Optimize dev server
  server: {
    open: true,
    cors: true,
    hmr: {
      overlay: true
    }
  }
})
