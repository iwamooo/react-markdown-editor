import eslint from 'rollup-plugin-eslint'
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: './src/js/app.js',
  dest: './dist/js/app.js',
  format: 'umd',
  external: ['whatwg-fetch'],
  plugins: [
    eslint(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        'es2015-rollup',
        'stage-0',
        'react'
      ],
      plugins: ['external-helpers']
    }),
    cjs({
      exclude: 'node_modules/process-es6/**',
      include: [
        'node_modules/**'
      ]
    }),
    globals(),
    replace({'process.env.NODE_ENV': JSON.stringify('production')}),
    resolve({
      browser: true,
      main: true,
      jsnext: true
    }),
    uglify()
  ]
}
