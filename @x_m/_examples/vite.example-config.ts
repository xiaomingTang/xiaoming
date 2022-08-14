import { CSSModulesOptions, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function getLocal(filename: string) {
  const paths = filename.split('/')
  const lastName = paths[paths.length - 1] ?? ''
  const lastTwoName = paths[paths.length - 2] ?? ''
  if (!lastTwoName) {
    return lastName
  }
  if (/^index\.module\.\w*ss/ig.test(lastName)) {
    return lastTwoName
  }
  return lastName
}

function hash(str: string, length = 6) {
  return Buffer.from(str, 'base64url').toString('base64url').slice(0, length)
}

const generateScopedName: CSSModulesOptions['generateScopedName'] = (name, filename) => {
  return `${getLocal(filename)}__${name}__${hash(`${filename}-${name}`, 5)}`
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  css: {
    modules: {
      generateScopedName,
      hashPrefix: 'prefix',
    },
  },
})
