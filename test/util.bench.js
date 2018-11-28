import test from 'ava'
import suite from 'chuhai'

import {
  hasCssProps,
  isEmpty,
  mergeStyles,
  sortAttrs
} from '../lib/util'

// isEmpty

test.only('isEmpty', suite.macro, t => {
  function isEmptyAlt (obj) {
    const pre = Array.isArray(obj) ? obj : Object.keys(obj)
    return pre.length === 0
  }
  let TRUE = true
  let FALSE = false

  t.cycle(() => {
    t.is(TRUE, true)
    t.is(FALSE, false)
  })

  t.bench('isEmpty({ is: \'not empty\' })', () => {
    FALSE = isEmpty({ is: 'not empty' })
  })

  t.bench('isEmpty([ 1, \'2\', [3] ])', () => {
    FALSE = isEmpty([ 1, '2', [3] ])
  })

  t.bench('isEmptyAlt({ is: \'not empty\' })', () => { FALSE = isEmptyAlt({ is: 'not empty' }) })
  t.bench('isEmptyAlt([ 1, \'2\', [3] ])', () => {
    FALSE = isEmptyAlt([ 1, '2', [3] ])
  })
})

// hasCssProps

test('hasCssProp', suite.macro, t => {
  t.bench('hasCssProp', () => {
    hasCssProps({ fontSize: '2px' }, require('./_cssProps'))
  })
  t.pass()
})

// mergeStyles

test('merge styles', suite.macro, t => {
  let res
  const obj1 = { fst: 'foo', othr: true, '@media something': { fst: 'bar' } }
  const obj2 = { snd: 'bar', '@media something': { snd: 'foo' }, '@media something else': { snd: 'foooooo' } }

  t.cycle(() => {
    t.deepEqual(obj1, { fst: 'foo', othr: true, '@media something': { fst: 'bar' } })
    t.deepEqual(obj2, { snd: 'bar', '@media something': { snd: 'foo' }, '@media something else': { snd: 'foooooo' } })
    t.deepEqual(res, {
      fst: 'foo',
      snd: 'bar',
      othr: true,
      '@media something': { fst: 'bar', snd: 'foo' },
      '@media something else': { snd: 'foooooo' }
    })
  })

  t.bench('mergeStyles (production)', () => {
    res = mergeStyles(obj1, obj2)
  })

  t.bench('mergeStyles as reduce', () => {
    res = Object.keys(obj2).reduce((acc, k) => {
      let target = acc[k]
      let inlet = obj2[k]
      acc[k] = typeof target === 'object' ? Object.assign({}, target, inlet) : inlet
      return acc
    }, { ...obj1 })
  })

  t.bench('mergeStyles alternative', () => {
    const list = obj2 != null ? Object.keys(obj2) : []
    const res = Object.assign({}, obj1)
    for (let i = 0; i < list.length; i++) {
      res[list[i]] =
        (typeof obj1[list[i]] === 'object')
          ? Object.assign({}, obj1[list[i]], obj2[list[i]])
          : obj2[list[i]]
    }
  })
})

// sortAttrs

test('sort Attrs', suite.macro, t => {
  let res
  const refObj = require('./_cssProps')
    .reduce((acc, k) => {
      acc[k] = k; return acc
    }, {
      fs: 'fontSize',
      bc: 'backgroundColor',
      p: 'padding'
    })

  const attrs = {
    p: 7,
    bc: 'blue',
    foo: 'bar',
    lineHeight: 1.5
  }

  function sortAttrsALT (attrs = {}, refObj = {}) {
    const styleProps = {}
    const rest = {}

    for (const prop in attrs) {
      const atP = attrs[prop]
      const rfP = refObj[prop]
      if (atP === 'as') continue // || typeof refObj[prop] !== 'string'
      if (rfP) styleProps[rfP] = atP
      else rest[prop] = atP
    }
    return { styleProps, rest }
  }

  t.cycle(() => {
    t.deepEqual(res, {
      styleProps: {
        backgroundColor: 'blue',
        padding: 7,
        lineHeight: 1.5
      },
      rest: { foo: 'bar' }
    })
  })

  t.bench('sortAttrs, alternative (slightly, slower)', () => {
    res = sortAttrsALT(attrs, refObj)
  })

  t.bench('sortAttrs optimized (production)', () => {
    res = sortAttrs(attrs, refObj)
  })
})
