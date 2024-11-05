import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    base: "/",
    build: {
      chunkSizeWarningLimit: 3000,
    },
    server: {
      proxy: {
        '/proxy': {
          target: `${env.VITE_ETMS_API_URL}:${env.VITE_ETMS_API_PORT}/api/`, // Use environment variable for backend URL
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy/, ''), // Optional: remove `/api` prefix if not needed on the backend
        },
      },
    },
  }
})
