import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['stage.yugam.in','yugam.in','localhost','127.0.0.1', '94905aabedba.ngrok-free.app'],
  },
})


