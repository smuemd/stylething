import test from 'ava'
import b from 'bss'
import { createBssHelpers } from '../lib/bssHelpers'
import * as theme from '../lib/theme'

const Hlprs = createBssHelpers(b, theme)

b.helper(Hlprs)

test('createBssHelpers returns bss helper object', t => {
  t.is(typeof Hlprs, 'object')
  t.true(Object.keys(Hlprs).length > 40)
})

test('createBssHelpers media groupers work', t => {
  const A = b`backgroundColor pink`.$notSmall`backgroundColor red`
  const B = b`backgroundColor pink`.$large`backgroundColor red`
  let C = Hlprs.flexExpand('auto')
  let D = Hlprs.flexExpand('whatever')
  let E = Hlprs.flexExpand('top')
  let F = Hlprs.align()

  for (const k in Hlprs) {
    const helper = Hlprs[k]
    let res = helper.hasOwnProperty('style') ? helper : helper('test')
    t.is(typeof res, 'object')
    t.is(typeof res.__style, 'object')
  }

  t.deepEqual(A.__style, {
    backgroundColor: 'pink',
    '@media screen and (min-width: 30em)': {
      backgroundColor: 'red'
    } })

  t.deepEqual(B.__style, {
    backgroundColor: 'pink',
    '@media screen and (min-width: 60em)': {
      backgroundColor: 'red'
    } })

  t.deepEqual(C.__style, { margin: 'auto' })
  t.deepEqual(D.__style, { margin: 'initial' })
  t.deepEqual(E.__style, { marginTop: 'auto' })
  t.deepEqual(F.__style, { verticalAlign: 'initial' })
})
