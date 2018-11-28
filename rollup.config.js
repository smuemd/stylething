import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'

export default [
  {
    input: 'lib/index.js',
    output: {
      file: 'stylething.js',
      exports: 'named',
      format: 'umd',
      name: 'stylething',
      sourcemap: true
    },
    plugins: process.env.TEST
      ? []
      : [
        buble(),
        filesize()
      ]
  }, {
    input: 'lib/index.js',
    output: {
      file: 'stylething.min.js',
      exports: 'named',
      format: 'umd',
      name: 'stylething',
      sourcemap: true
    },
    plugins: [
      buble(),
      uglify({ mangle: true, compress: true }),
      filesize()
    ]
  }, {
    input: 'lib/index.js',
    output: {
      file: 'stylething.esm.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      buble(),
      filesize()
    ]
  }
]
