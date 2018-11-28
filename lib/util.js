/* eslint-disable no-unused-vars */

// export const isNode = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'

// https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0
// export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

/**
 * Flatten an array indefinitely.
 * https://github.com/blakeembrey/array-flatten/blob/master/array-flatten.js
 *
 * @param  {Array} array
 * @param  {Array} result
 * @return {Array}
 */
export function flattenDown (array, result) {
  for (var i = 0; i < array.length; i++) {
    var value = array[i]

    if (Array.isArray(value)) {
      flattenDown(value, result)
    } else {
      result.push(value)
    }
  }

  return result
}

/*
  hyperscript parser
  credit: https://github.com/MithrilJS/mithril.js/blob/next/render/hyperscript.js
 */

// eslint-disable-next-line no-useless-escape
const selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g

export const hasOwn = {}.hasOwnProperty

export function isEmpty (object) {
  // for (let key in object) if (hasOwn.call(object, key)) return false
  // return true
  if (object == null || typeof object !== 'object') return true
  const pre = Array.isArray(object)
    ? object
    : Object.keys(object)
  return pre.length === 0
}

export function compileSelector (selector) {
  let match
  let tag = 'div'
  const classes = []
  const attrs = {}
  while ((match = selectorParser.exec(selector))) {
    const type = match[1]
    const value = match[2]
    if (type === '' && value !== '') tag = value
    else if (type === '#') attrs.id = value
    else if (type === '.') classes.push(value)
    else if (match[3][0] === '[') {
      let attrValue = match[6]
      if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, '$1').replace(/\\\\/g, '\\')
      if (match[4] === 'class') classes.push(attrValue)
      else attrs[match[4]] = attrValue === '' ? attrValue : attrValue || true
    }
  }
  if (classes.length > 0) attrs.className = classes.join(' ')
  // return selectorCache[selector] = { tag: tag, attrs: attrs }
  return { tag: tag, attrs: attrs }
}

/*
  List of css props
  credit https://github.com/porsager/bss/blob/master/lib/utils.js
 */

function findWidth (obj) {
  return obj
    ? obj.hasOwnProperty('width')
      ? obj
      : findWidth(Object.getPrototypeOf(obj))
    : {}
}

export const __findWidthTest = findWidth

const noDashNotLength = p => p.indexOf('-') === -1 && p !== 'length'
export const CSS_PROPERTIES = ['float'].concat(Object.keys(
  typeof document === 'undefined'
    ? {}
    : findWidth(document.documentElement.style)
).filter(noDashNotLength))

// export function hasCssProps (obj, propList) {
//   // const list = Array.isArray(obj) ? obj : Object.keys(obj)
//   // for (let i = 0; i < list.length; i++) if (propList.indexOf(list[i]) > 0) return true
//   for (let prop in obj) if (propList.indexOf(prop) > 0) return true
//   return false
// }

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

const CSS_PROP_OBJ =
  require('../test/_cssProps').reduce((acc, prop) => { acc[prop] = prop; return acc }, popular)

export function sortAttrs (attrs = {}, refObj = CSS_PROP_OBJ) {
  const styleProps = {}
  const rest = {}
  const list = Object.keys(typeof attrs === 'object' ? attrs : {})

  for (let i = 0; i < list.length; i++) {
    const prop = list[i]
    const atrP = attrs[prop]
    const refP = refObj[prop]
    if (prop === 'as') continue
    if (refP != null) styleProps[refP] = atrP
    else rest[prop] = atrP
  }

  return { styleProps, rest }
}

// immutable Object.assign that patches n level children
// mergeStyles :: (a, b) -> Object
export function mergeStyles (a = {}, b = {}) {
  const res = Object.assign({}, a)
  for (const k in b) {
    const ak = a[k]
    const bk = b[k]
    res[k] = typeof ak === 'object' ? mergeStyles(ak, bk) : bk
  }
  return res
}

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
// function is (x, y) {
//   // SameValue algorithm
//   // eslint-disable-next-line no-self-compare
//   return (x === y) ? x !== 0 || y !== 0 || 1 / x === 1 / y : x !== x && y !== y
// }

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */

// function shallowEqual (objA, objB) {
//   if (is(objA, objB)) return true
//   else if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) return false
//
//   const keysA = Object.keys(objA)
//   const keysB = Object.keys(objB)
//
//   if (keysA.length !== keysB.length) return false
//
//   // Test for A's keys different from B.
//   for (let i = 0; i < keysA.length; i++) {
//     if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) return false
//   }
//   return true
// }
