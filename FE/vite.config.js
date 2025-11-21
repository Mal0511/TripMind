
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
  host: '0.0.0.0',       // listen mọi IP
    port: 5173,
    strictPort: true,
    https: false,
    allowedHosts: 'all',   // cho phép mọi host
    origin: 'null',        // chấp nhận mọi hostname (ngrok)
    hmr: false             // tắt HMR tạm thời để tránh block
}
})
