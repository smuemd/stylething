import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'
// import resolve from 'rollup-plugin-node-resolve'

export default [
  {
    external: ['bss'],
    input: 'lib/index.js',
    output: {
      file: 'dist/stylething.js',
      exports: 'named',
      format: 'umd',
      name: 'stylething',
      globals: {
        bss: 'b'
      },
      sourcemap: true
    },
    plugins: process.env.TEST
      ? []
      : [
        buble(),
        filesize()
      ]
  }, {
    external: ['bss'],
    input: 'lib/index.js',
    output: {
      file: 'dist/stylething.min.js',
      exports: 'named',
      format: 'umd',
      name: 'stylething',
      globals: {
        bss: 'b'
      },
      sourcemap: true
    },
    plugins: [
      buble(),
      uglify({ mangle: true, compress: true }),
      filesize()
    ]
  }, {
    external: ['bss'],
    input: 'lib/index.js',
    output: {
      file: 'dist/stylething.esm.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      buble(),
      filesize()
    ]
  }
]
