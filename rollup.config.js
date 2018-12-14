import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'
// import resolve from 'rollup-plugin-node-resolve'

export default [
  {
    external: ['bss'],
    input: 'lib/index.js',
    output: {
      file: 'dist/index.js',
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
      file: 'dist/index.min.js',
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
      file: 'dist/esm/index.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      buble(),
      filesize()
    ]
  }, {
    input: 'lib/theme.js',
    output: {
      file: 'dist/theme.js',
      exports: 'named',
      format: 'umd',
      name: 'defaultTheme',
      sourcemap: true
    },
    plugins: process.env.TEST
      ? []
      : [ buble(), filesize() ]
  }, {
    input: 'lib/theme.js',
    output: {
      file: 'dist/theme.min.js',
      exports: 'named',
      format: 'umd',
      name: 'defaultTheme',
      sourcemap: true
    },
    plugins: [
      buble(),
      uglify({ mangle: true, compress: true }),
      filesize()
    ]
  }, {
    input: 'lib/theme.js',
    output: {
      file: 'dist/esm/theme.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      buble(),
      filesize()
    ]
  }
]
