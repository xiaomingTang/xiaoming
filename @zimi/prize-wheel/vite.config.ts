import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-dts'
import babel from '@rollup/plugin-babel'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      name: 'XM_PrizeWheel',
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
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
