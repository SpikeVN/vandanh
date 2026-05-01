import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [devtools(), solidPlugin(), tailwindcss()],
  // Temporarily before moving on to a custom domain
  base: "/butcuacotam2/",
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  publicDir: "static"
});
