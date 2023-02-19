import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'
import babel from '@rollup/plugin-babel'

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      name: 'ZM_InteractDom',
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@zimi/interact'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@zimi/interact': 'ZM_Interact',
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
