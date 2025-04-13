import { defineConfig } from 'vite'
import { parseHTML } from 'linkedom'
import { HtmlModify } from './plugins/html-modify'

export default defineConfig({
  plugins: [
    HtmlModify(),
	],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
})