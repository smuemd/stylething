import test from 'ava'
import { theme } from '../lib/index'

test('has theme obj with expected props', t => {
  const {
    breakpoints,
    space,
    fontSizes,
    radii,
    colors
  } = theme

  t.true(Array.isArray(breakpoints))
  t.true(Array.isArray(space))
  t.true(Array.isArray(fontSizes))
  t.true(Array.isArray(radii))
  t.is(typeof colors, 'object')
})
