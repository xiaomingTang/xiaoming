// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'tsup'

export default defineConfig({
  // build each source file separately (one-to-one ts -> js)
  entry: ['src/**/*.ts'],
  format: ['cjs', 'esm'],
  outDir: 'dist',
  dts: true,
  sourcemap: true,
  clean: true,
  // disable bundling so each entry file is emitted separately
  bundle: false,
  target: 'node16',
  shims: false,
  minify: true,
  external: ['electron'],
})
