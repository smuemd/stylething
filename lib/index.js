import parse from 'bss'

import { compileSelector, flattenDown, isEmpty, mergeStyles } from './util'
import { createMithrilComp, createReactComp } from './adapters'

const _blnkObj = {}
const _blnkArr = []
let _doc
try {
  _doc = window.document
} catch (e) {
  // console.warn(e.message)
  _doc = { createElement: x => x }
}

// debug
// const fromStylt = 'from stylt:'

// handle first argument
const selectorCache = {}
export function handle1st (parent = 'div', $doc = _doc) {
  if (typeof parent !== 'string') {
    return (parent.stylt == null || isEmpty(parent.stylt))
      ? { tag: 'div', attrs: {}, fns: [] }
      : parent.stylt
  }

  const res = selectorCache[parent] || compileSelector(parent)

  try {
    $doc.createElement(res.tag)
    return (selectorCache[parent] = res)
  } catch (err) {
    console.warn(err.message)
    return selectorCache['div'] || (selectorCache['div'] = compileSelector('div'))
  }
}

// handle second argument

export function handle2nd (thing = _blnkObj) {
  const isStylt = thing.hasOwnProperty('stylt')
  const hasClassName = typeof thing.className === 'string'
  const hasClass = typeof thing.class === 'string'
  const hasStyle = !isEmpty(thing.style || thing.css)// (hasCssProps(thing.style, propRef) || hasCssProps(thing.css, propRef))

  // thing as Object cases
  if (isStylt) return {}
  if (hasClass && hasStyle) return thing.style ? thing : { class: thing.class, style: thing.css }
  if (hasClassName && hasStyle) {
    return {
      class: [ thing.className, parse(thing.style || thing.css).class ].join(' '),
      style: thing.style || thing.css
    }
  }
  if (hasClass || hasClassName) return { class: thing.class || thing.className }
  if (hasStyle) return parse(thing.style || thing.css)

  // handle thing :: Object | Array | String
  // parse css in template strings and style def objects
  const res = (typeof thing !== 'function' && typeof thing !== 'string') // Simplify?, not sure if this should parse at all
    ? parse(thing)
    : {}
  return !isEmpty(res.style)
    ? res
    : (typeof thing === 'string' && thing !== '' && !selectorCache[thing]) // could fail
      ? { class: thing }
      : {}
}

// handle Functions

export function handleFns (fns = _blnkArr, attrs = _blnkObj, theme) {
  // const res = pipe(...fns)(Object.assign({}, attrs, theme))
  let res = Object.assign({}, attrs)
  for (let i = 0; i < fns.length; i++) res = mergeStyles(res, fns[i](attrs, theme))
  return isEmpty(res) ? res : parse(res)
}

// create prelim Result
const emptyAttrs = _blnkObj
export function createPrelimRes (parent, parsedThing, fns, theme, output = 'class' || 'style') {
  const parentAttrs = parent.attrs || _blnkObj
  const preParsedFns = isEmpty(fns) ? _blnkObj : handleFns(fns, emptyAttrs, theme)

  let prelim = {}
  if (output === 'style') {
    prelim.style = mergeStyles(parentAttrs.style, mergeStyles(parsedThing.style, preParsedFns.style))
    parentAttrs.className && (prelim.className = parentAttrs.className)
  } else {
    prelim.className = [
      parent.attrs.className,
      parsedThing.class,
      preParsedFns.class
    ].filter(a => a != null && a !== '').join(' ')
  }

  const __stylt = {
    tag: parent.tag,
    fns,
    attrs: mergeStyles(parentAttrs, prelim)
  }

  return { __stylt, prelim }
}

// preCompute

export function preCompute (prelim, fns = _blnkArr, theme, output = 'class' || 'style') {
  const result = {}
  const noFns = isEmpty(fns)

  return function compute (attrs = _blnkObj) {
    const attrsStyle = attrs.css || attrs.style
    const attrsClass = attrs.class || attrs.className
    const filtered = Object.assign({}, attrs)

    if (attrsClass || attrsStyle) {
      const blacklist = [
        'style',
        'css',
        'class',
        'className'
      ]
      for (let i = 0; i < blacklist.length; i++) delete filtered[blacklist[i]]
    }

    const noFiltered = isEmpty(filtered)
    const hasParsedAttrs = (noFns && !noFiltered)
    const hasParsedFns = (!noFns && !noFiltered)

    const parsedAttrs = hasParsedAttrs ? parse(filtered) : {}
    const parsedFns = hasParsedFns ? handleFns(fns, filtered, theme) : {}
    const parsedAttrsCss = attrsStyle ? parse(attrsStyle) : {}

    if (output === 'style') {
      const style1 = !hasParsedAttrs ? prelim.style : mergeStyles(prelim.style, parsedAttrs.style)
      const style2 = !hasParsedFns ? style1 : mergeStyles(style1, parsedFns.style)
      result.style = !attrsStyle ? style2 : mergeStyles(style2, parsedAttrsCss.style)
      const resClass = [ prelim.className, attrsClass ].filter(a => a != null && a !== '').join(' ')
      resClass && (result.className = resClass)
      // result.style = mergeStyles(mergeStyles(mergeStyles(prelim.style, parsedAttrs.style), parsedFns.style), parsedAttrsCss.style)
    } else {
      const cls1 = !hasParsedAttrs ? prelim.className : prelim.className ? prelim.className + ' ' + parsedAttrs.class : parsedAttrs.class
      const cls2 = !hasParsedFns ? cls1 : cls1 ? cls1 + ' ' + parsedFns.class : parsedFns.class
      const cls3 = !attrsClass ? cls2 : cls2 ? cls2 + ' ' + attrsClass : attrsClass
      result.className = !attrsStyle ? cls3 : cls3 ? cls3 + ' ' + parsedAttrsCss.class : parsedAttrsCss.class
    }
    return result
  }
}

// export default
export const createStyleThing = (lib, config = { mode: 'react', outputType: 'class' }) => {
  const mode = config.mode || 'react' // || 'mithril'
  const outputType = config.outputType || 'class' // or 'style'
  const theme = config.theme

  return function stylething (a, b, ...c) {
    const parent = handle1st(a || 'div')
    const parsedThing = (arguments.length > 1) ? handle2nd(b) : handle2nd(a)
    const fns = flattenDown([ parent.fns, a, b, c ], []).filter(x => typeof x === 'function' && x['stylt'] == null)

    const { prelim, __stylt } = createPrelimRes(parent, parsedThing, fns, theme, outputType)
    const compute = preCompute(prelim, fns, theme, outputType) // injects: parent.attrs, parsedThing

    // console.log('++++++++++++++++ styld setup log ++++++++++++++++')
    // console.log('styld called w/ arguments', 'a:  ', a, `(type: ${typeof a})`)
    // console.log('                         ', 'b:  ', b, `(type: ${typeof b})`)
    // console.log('                         ', 'c:  ', c, `(type: ${typeof c})`)
    // console.log(fromStylt, 'arguments.length', arguments.length)
    // console.log(fromStylt, 'parent:', parent)
    // console.log(fromStylt, 'fns: ', fns, '( !isEmpty(fns)?', !isEmpty(fns) + ' )')
    // // console.log(fromStylt, 'parsedThing', parsedThing)
    // console.log(fromStylt, 'parsedThing.style: ', parsedThing.style)
    // console.log(fromStylt, 'parsedThing.class: ', parsedThing.class)
    // console.log(fromStylt, 'prelimRes: ', prelim)
    // console.log(fromStylt, '_stylt', __stylt)
    // console.log(fromStylt, 'computedDefault', __stylt.attrs)

    if (mode === 'mithril') return createMithrilComp(lib, { __stylt, compute })
    else return createReactComp(lib, { __stylt, compute })
  }
}

export { default as bss } from 'bss'
