import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'
// import resolve from 'rollup-plugin-node-resolve'

export default [
  {
    external: ['bss'],
    input: 'lib/index.js',
    output: {
      file: './stylething.js',
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
      file: './stylething.min.js',
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
      file: './stylething.esm.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      buble(),
      filesize()
    ]
  },

  // theme
  {
    input: 'lib/theme.js',
    output: {
      file: './theme.js',
      exports: 'named',
      format: 'umd',
      name: 'theme',
      sourcemap: true
    },
    plugins: process.env.TEST
      ? []
      : [ buble(), filesize() ]
  }, {
    input: 'lib/theme.js',
    output: {
      file: './theme.min.js',
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
      file: 'theme.esm.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      buble(),
      filesize()
    ]
  },

  // helpers
  {
    input: 'lib/bssHelpers.js',
    output: {
      file: './bssHelpers.js',
      exports: 'named',
      format: 'umd',
      name: 'helpers',
      sourcemap: true
    },
    plugins: process.env.TEST
      ? []
      : [ buble(), filesize() ]
  }, {
    input: 'lib/bssHelpers.js',
    output: {
      file: './bssHelpers.min.js',
      exports: 'named',
      format: 'umd',
      name: 'helpers',
      sourcemap: true
    },
    plugins: [
      buble(),
      uglify({ mangle: true, compress: true }),
      filesize()
    ]
  }, {
    input: 'lib/bssHelpers.js',
    output: {
      file: 'bssHelpers.esm.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      buble(),
      filesize()
    ]
  }
]
