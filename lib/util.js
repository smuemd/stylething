const _blnkObj = {}
// const _blnkArr = []

/**
 * I :: a -> a
 * Identity combinator (compute fn fallback)
 *
 * @param x
 * @return {*}
 * @constructor
 */
export const I = x => x

// https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0
// export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

/**
 * flattenDown :: (Array, Array) -> Array
 * Flatten an array indefinitely.
 * https://github.com/blakeembrey/array-flatten/blob/master/array-flatten.js
 *
 * @param  {Array} array
 * @param  {Array} result
 * @return {Array}
 */
export function flattenDown (array, result) {
  for (let i = 0; i < array.length; i++) {
    const value = array[i]

    if (Array.isArray(value)) {
      flattenDown(value, result)
    } else {
      result.push(value)
    }
  }

  return result
}

/**
 * selectorParser :: RegExp
 * via: https://github.com/MithrilJS/mithril.js/blob/next/render/hyperscript.js
 *
 * @type {RegExp}
 */
// eslint-disable-next-line no-useless-escape
const selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g

// export const hasOwn = {}.hasOwnProperty
/**
 * isEmpty :: a | b -> Boolean
 * check if an object or array is empty
 *
 * @param obj
 * @return {boolean}
 */
export function isEmpty (obj) {
  // for (let key in object) if (hasOwn.call(object, key)) return false
  // return true
  const pre = Array.isArray(obj)
    ? obj
    : Object.keys(obj != null ? obj : _blnkObj)
  return pre.length === 0
}

/**
 * compileSelector :: String -> Object
 * compile object from hypersript selector string
 * via: https://github.com/MithrilJS/mithril.js/blob/next/render/hyperscript.js
 *
 * @param selector
 * @return {{tag: string, attrs}}
 */
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

/**
 * findWidth :: a -> a | Object
 * via https://github.com/porsager/bss/blob/master/lib/utils.js
 *
 * @param obj
 * @return {*}
 */
function findWidth (obj) {
  return obj
    ? obj.hasOwnProperty('width')
      ? obj
      : findWidth(Object.getPrototypeOf(obj))
    : _blnkObj
}
export const __findWidthTest = findWidth

const noDashNotLength = p => p.indexOf('-') === -1 && p !== 'length'

/**
 * CSS_PROPERTIES :: Array String
 * array of all browser supported css properties
 * via https://github.com/porsager/bss/blob/master/lib/utils.js
 *
 * @type {string[]}
 */
export const CSS_PROPERTIES = ['float'].concat(
  Object.keys(typeof document === 'undefined'
    ? _blnkObj
    : findWidth(document.documentElement.style))
    .filter(noDashNotLength))

// export function hasCssProps (obj, propList) {
//   // const list = Array.isArray(obj) ? obj : Object.keys(obj)
//   // for (let i = 0; i < list.length; i++) if (propList.indexOf(list[i]) > 0) return true
//   for (let prop in obj) if (propList.indexOf(prop) > 0) return true
//   return false
// }

export const popular = {
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

/**
 * CSS_PROP_OBJ :: Object String
 * Map of all css properties keys accepted by the css parser (bss)
 *
 * @type {object}
 */
export const CSS_PROP_OBJ = CSS_PROPERTIES.reduce((acc, prop) => {
  acc[prop] = prop; return acc
}, popular)

/**
 * Map object keys by reference of supported css properties
 *
 * @param attrs
 * @param refObj
 * @return {{styleProps, rest}}
 */
export function sortAttrs (attrs = _blnkObj, refObj = CSS_PROP_OBJ) {
  const styleProps = {}
  const rest = {}
  const list = Object.keys(attrs || _blnkObj)

  for (let i = 0; i < list.length; i++) {
    const k = list[i]
    const atrV = attrs[k]
    const refV = refObj[k]
    if (k === 'as') continue
    if (refV != null) styleProps[refV] = atrV
    else rest[k] = atrV
  }

  return { styleProps, rest }
}

/**
 * isPojo :: Object -> Boolean
 * Distinguish JS arrays from plain old JS objects
 *
 * @param object
 * @return {boolean}
 */
// const isPojo = (object) => (typeof object === 'object' && !Array.isArray(object))

/**
 * mergeStyles :: (a, b) -> Object
 * Immutably deep merge two objects
 *
 * @param a
 * @param b
 * @return {object}
 */
export function mergeStyles (a = _blnkObj, b = _blnkObj) {
  const list = Object.keys(b || _blnkObj)
  const res = Object.assign({}, a)
  // for (const k in b) {
  for (let i = 0; i < list.length; i++) {
    const k = list[i]
    const ak = a[k]
    const bk = b[k]
    res[k] = (typeof ak === 'object' && !Array.isArray(ak)) ? mergeStyles(ak, bk) : bk
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
