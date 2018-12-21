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
})
