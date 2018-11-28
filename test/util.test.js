import test from 'ava'
import {
  isEmpty,
  mergeStyles,
  sortAttrs,
  compileSelector, __findWidthTest, CSS_PROPERTIES
} from '../lib/util'

const Window = require('window')
const { document } = new Window()

test('CSS_PROPS is empty', t => {
  t.deepEqual(CSS_PROPERTIES, [ 'float' ], 'no elements in node environment')
})

// isEmpty

test('isEmpty detects empty objects', (t) => {
  const a = isEmpty({ is: 'not empty' })
  const b = isEmpty({})

  t.false(a, 'returns false for not empty POJO')
  t.true(b, 'returns true for empty POJO')
})

test('isEmpty detects empty arrays', (t) => {
  const a = isEmpty([ 1, '2', [ 3 ], true ])
  const b = isEmpty([])

  t.false(a, 'returns false for not empty Array')
  t.true(b, 'returns true for empty Array')
})

test('isEmpty does not throw on null or undefined', (t) => {
  const a = isEmpty()
  const b = isEmpty(null)

  t.true(a, 'returns true for undefined')
  t.true(b, 'returns true for null')
})

// compileSelector

test('compileSelector parses hyperscript string', (t) => {
  const a = compileSelector('span#hello.world[cool]')
  t.deepEqual(a, {
    tag: 'span',
    attrs: {
      className: 'world',
      id: 'hello',
      cool: true
    }
  })
})

// findWidth

test('findWith does something', t => {
  const a = __findWidthTest(document.documentElement.style)

  t.pass(a)
  t.is(typeof a, 'object')
  t.true(Object.keys(a).length > 750) // 751
  t.false(document.documentElement.style.hasOwnProperty('width'))
})

// hasCssProps

// test('hasCssProps detects css properties in objects', t => {
//   const propList = require('./_cssProps')
//   const a = hasCssProps({ fontSize: 'whatever' }, propList)
//   const b = hasCssProps(null, propList)
//   const c = hasCssProps({}, propList)
//   const d = hasCssProps({ foo: 'bar' }, propList)
//   const e = hasCssProps([ 'fontSize' ], propList)
//
//   t.true(a)
//   t.false(b)
//   t.false(c)
//   t.false(d)
//   t.false(e)
//   t.is(typeof CSS_PROPERTIES, 'object')
//   t.true(Array.isArray(CSS_PROPERTIES))
//   t.is(CSS_PROPERTIES.length, 1)
//   t.is(CSS_PROPERTIES[0], 'float')
// })

// mergeStyles

test('mergeStyles patches n level children objects', t => {
  const a = mergeStyles({
    a: 'hello',
    b: { beep: 'boop' },
    c: {
      d: 2,
      e: 'f',
      g: { drill: 'baby, drill', even: { one: 'level deeper' } } }
  },
  {
    b: { hello: 'hi' },
    c: {
      g: { number: 3, even: { num: 4 } } }
  })

  t.deepEqual(a, {
    a: 'hello',
    b: { beep: 'boop', hello: 'hi' },
    c: {
      d: 2,
      e: 'f',
      g: {
        number: 3,
        drill: 'baby, drill',
        even: {
          one: 'level deeper',
          num: 4
        }
      }
    }
  })
})

test('mergeStyles works as reducer function', t => {
  const a = [
    { a: 'hello', b: { beep: 'boop' } },
    { b: { hello: 'hi' } }
  ].reduce(mergeStyles, { accumulator: 'initial' })

  t.deepEqual(a, {
    a: 'hello',
    accumulator: 'initial',
    b: {
      beep: 'boop',
      hello: 'hi'
    }
  })
})

test('mergeStyles doesn’t throw with null values', t => {
  t.notThrows(() => mergeStyles(null, null))
  t.deepEqual(mergeStyles(null, undefined), {})
})

test('mergeStyles does not mutate its arguments', t => {
  const A = { fs: 1, deep: { fs: 2 }, deepr: { fs: 3 }, other: true }
  const B = { bg: 10, deep: { bg: 20 }, deepr: { bg: 30 } }
  const r = mergeStyles(A, B)

  t.deepEqual(A, { fs: 1, deep: { fs: 2 }, deepr: { fs: 3 }, other: true })
  t.deepEqual(B, { bg: 10, deep: { bg: 20 }, deepr: { bg: 30 } })
  t.deepEqual(r, {
    fs: 1,
    bg: 10,
    other: true,
    deep: { fs: 2, bg: 20 },
    deepr: { fs: 3, bg: 30 }
  })
})

// sortAttrs

test('sortAttrs distinguishes style props form other attrs', t => {
  const refObj = { fontSize: 'fontSize', fs: 'fontSize', bg: 'backgroundColor' }
  const a = sortAttrs({
    onClick: 'x => x',
    fontSize: '1em',
    bg: 'pink'
  }, refObj)

  const { styleProps, rest } = a

  t.deepEqual(styleProps, { fontSize: '1em', backgroundColor: 'pink' })
  t.deepEqual(rest, { onClick: 'x => x' })
})
