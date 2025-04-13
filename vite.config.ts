import { defineConfig } from 'vite'
import { HtmlModify } from './plugins/html-modify'

export default defineConfig({
  plugins: [
    HtmlModify(),
	],
  build: {
    rollupOptions: {
      output: {
        dir: '../',
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
})