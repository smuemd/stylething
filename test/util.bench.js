import test from 'ava'
import suite from 'chuhai'

import {
  // hasCssProps,
  isEmpty,
  mergeStyles,
  sortAttrs
} from '../lib/util'

const { TEST_CSS_PROP_OBJ } = require('./_cssProps')

// isEmpty

test('isEmpty', suite.macro, t => {
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
})

// // hasCssProps
//
// test('hasCssProp', suite.macro, t => {
//   t.bench('hasCssProp', () => {
//     hasCssProps({ fontSize: '2px' }, require('./_cssProps'))
//   })
//   t.pass()
// })

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

  const mergeReduce = (a, b) => Object.keys(b).reduce((acc, k) => {
    const target = acc[k]
    const inlet = b[k]
    acc[k] = typeof target === 'object' && !Array.isArray(target) ? mergeReduce(target, inlet) : inlet
    return acc
  }, Object.assign({}, a))

  t.bench('mergeStyles as reduce', () => {
    res = mergeReduce(obj1, obj2)
  })

  const mergeAlt = (a, b) => {
    const res = Object.assign({}, a)
    for (let k in b) {
      const ak = a[k]
      const bk = b[k]
      res[k] = (typeof ak === 'object' && !Array.isArray(ak))
        ? mergeAlt(ak, bk)
        : bk
    }
  }

  t.bench('mergeStyles alternative', () => {
    mergeAlt(obj1, obj2)
  })
})

// sortAttrs

test('sort Attrs', suite.macro, t => {
  let res
  const attrs = {
    p: 7,
    bc: 'blue',
    foo: 'bar',
    lineHeight: 1.5
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

  t.bench('sortAttrs optimized (production)', () => {
    res = sortAttrs(attrs, TEST_CSS_PROP_OBJ)
  })
  let eob = {}

  function sortAttrsALT (attrs = eob, refObj = eob) {
    const styleProps = {}
    const rest = {}

    for (const prop in attrs) {
      const atP = attrs[prop]
      const rfP = refObj[prop]
      if (atP === 'as') continue
      if (rfP) styleProps[rfP] = atP
      else rest[prop] = atP
    }
    return { styleProps, rest }
  }

  t.bench('sortAttrs, alternative (slightly, slower)', () => {
    res = sortAttrsALT(attrs, TEST_CSS_PROP_OBJ)
  })
})
