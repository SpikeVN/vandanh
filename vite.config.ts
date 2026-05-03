import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';
import preloadAssets from 'vite-plugin-preload-assets';

import bricolageRegular from "./assets/fonts/bricolage-grotesque-v9-latin_vietnamese-regular.woff2"
import bricolageMedium from "./assets/fonts/bricolage-grotesque-v9-latin_vietnamese-600.woff2"
import cormorant from "./assets/fonts/cormorant-garamond-v21-latin_vietnamese-regular.woff2"

export default defineConfig({
  plugins: [devtools(), solidPlugin(), tailwindcss(), preloadAssets({
    preloadGoogleFonts: true,
    fontsToPreload: [
      { href: bricolageRegular },
      { href: bricolageMedium },
      { href: cormorant }
    ],
  })],
  // Temporarily before moving on to a custom domain
  base: "/butcuacotam2/",
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
      },
      format: {
        comments: false,
      },
    },
    cssMinify: true,
  },
  publicDir: "static"
});
