import { defineConfig } from 'vite'
import babel from '@rollup/plugin-babel'

export default defineConfig({
  build: {
    sourcemap: false,
    target: 'es2015',
    rollupOptions: {
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
})
