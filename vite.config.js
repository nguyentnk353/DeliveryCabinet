import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // optimizeDeps: {
  //   exclude: [
  //     'react-pro-sidebar',
  //     'notistack',
  //     '@mui_material',
  //     'react',
  //     'react-dom_client',
  //     'react-router-dom',
  //     'react_jsx-dev-runtime',
  //   ],
  // },
});
