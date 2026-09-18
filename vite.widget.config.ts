import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// Separate build for the embeddable <food-water-calculator> custom element.
// Kept apart from vite.config.ts (the full-page demo build) since this one
// needs library mode and inlined CSS instead of an emitted index.html.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Vite only replaces process.env.NODE_ENV automatically for app builds;
  // lib mode needs it explicit or React's bundled checks throw at runtime.
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: 'dist-widget',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: resolve(import.meta.dirname, 'src/widget.jsx'),
      formats: ['es'],
      fileName: () => 'widget.js',
    },
  },
})
