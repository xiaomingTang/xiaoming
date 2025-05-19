import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const DEFAULT_SSL_CONFIG = {
  key: path.resolve(__dirname, '../resources/key.pem'),
  cert: path.resolve(__dirname, '../resources/cert.pem'),
}
