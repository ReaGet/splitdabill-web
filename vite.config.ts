import { defineConfig } from 'vite'
import { HtmlModify } from './plugins/html-modify'
import cleanPlugin from 'vite-plugin-clean'

export default defineConfig({
  plugins: [
    HtmlModify(),
    cleanPlugin({
      targetFiles: ['../assets']
    })
	],
  build: {
    rollupOptions: {
      output: {
        dir: '../',
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
})