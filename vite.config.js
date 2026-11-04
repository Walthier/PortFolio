import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        proyecto: resolve(__dirname, 'proyecto.html'),
        'pagina-ia': resolve(__dirname, 'pagina-ia.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});
