import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-dts'
import babel from '@rollup/plugin-babel'

const isExternal = (id: string) => !id.startsWith('.') && !path.isAbsolute(id)

export default defineConfig({
  build: {
    sourcemap: false,
    lib: {
      name: 'XM_InteractDom',
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    target: 'es2015',
    rollupOptions: {
      external: isExternal,
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
      plugins: [
        babel({
          babelHelpers: 'runtime',
          extensions: ['.ts', '.tsx'],
          presets: [
            [
              '@babel/preset-env',
              {
                corejs: 3,
                useBuiltIns: 'usage',
              },
            ],
          ],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                corejs: 3,
              },
            ],
          ],
        }),
      ],
    },
  },
  plugins: [dts()],
})
