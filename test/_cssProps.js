const Window = require('window')
const { document } = new Window()

function findWidth (obj) {
  return obj
    ? obj.hasOwnProperty('width')
      ? obj
      : findWidth(Object.getPrototypeOf(obj))
    : {}
}

const popular = {
  // as: 'as',
  css: 'css',
  style: 'style',
  class: 'class',
  className: 'className',
  mx: 'mx',
  my: 'my',
  px: 'px',
  py: 'py',
  bg: 'backgroundColor',

  ai: 'alignItems',
  b: 'bottom',
  bc: 'backgroundColor',
  br: 'borderRadius',
  bs: 'boxShadow',
  c: 'color',
  d: 'display',
  f: 'float',
  fd: 'flexDirection',
  ff: 'fontFamily',
  fs: 'fontSize',
  h: 'height',
  jc: 'justifyContent',
  l: 'left',
  lh: 'lineHeight',
  ls: 'letterSpacing',
  m: 'margin',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  mt: 'marginTop',
  o: 'opacity',
  p: 'padding',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
  pt: 'paddingTop',
  r: 'right',
  t: 'top',
  ta: 'textAlign',
  td: 'textDecoration',
  tt: 'textTransform',
  w: 'width'
}

const TEST_CSS_PROPERTIES =
  ['float'].concat(
    Object.keys(typeof document === 'undefined'
      ? {}
      : findWidth(document.documentElement.style)
    ).filter(p => p.indexOf('-') === -1 && p !== 'length'))

const TEST_CSS_PROP_OBJ = TEST_CSS_PROPERTIES
  .reduce((acc, prop) => { acc[prop] = prop; return acc }, popular)

module.exports = {
  TEST_CSS_PROP_OBJ,
  TEST_CSS_PROPERTIES
}
