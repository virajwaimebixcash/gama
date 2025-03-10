import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // const isDevelopment = mode === 'development';
  return ({
    plugins: [react()],
    base: "/react",
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    // build: {
    //   outDir: isDevelopment ? 'dist' : 'build-stag',
    // },
    // server: {
    //   port: mode === 'development' ? 4000 : 3000,
    // },

  })
})
