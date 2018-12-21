import test from 'ava'
import {
  breakpoints,
  space,
  fontSizes,
  radii,
  colors
} from '../lib/theme'

test('has theme obj with expected props', t => {
  t.true(Array.isArray(breakpoints))
  t.true(Array.isArray(space))
  t.true(Array.isArray(fontSizes))
  t.true(Array.isArray(radii))
  t.is(typeof colors, 'object')
})
