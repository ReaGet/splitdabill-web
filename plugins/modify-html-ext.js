import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

fs.rename(
  path.resolve(__dirname, '../../index.html'),
  path.resolve(__dirname, '../../index.php'),
  () => { console.log('index.html changed to index.php')
})