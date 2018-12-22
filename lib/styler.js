import b from 'bss'

import { compileSelector, flattenDown, I, isEmpty, mergeStyles } from './util'
import { createMithrilComp, createPreactComp, createReactComp } from './adapters'

const _blnkObj = {}
const _blnkArr = []
let _doc
try { _doc = window.document } catch (e) { _doc = { createElement: I } }

// debug
// const fromStylt = 'from stylt:'

/**
 * selectorCache :: Object
 * @type {{}}
 */
const selectorCache = {}

/**
 * handle1st :: (a | b, c) -> Object
 * handle first styler argument
 *
 * @param parent
 * @param $doc
 * @return {*}
 */
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
    return selectorCache['div'] || (selectorCache['div'] = compileSelector('div'))
  }
}

/**
 * handle2nd :: (a :: Object | String | Function, b :: Function) -> Object
 * Handle second styler argument
 *
 * @param thing
 * @param parse - bss instance
 * @return {*}
 */
export function handle2nd (thing = _blnkObj, parse = b) {
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

/**
 * handleFns :: (a :: Function, b :: Array Function, c :: Object, d :: Object) -> Object
 * handle responsive styles functions
 *
 * @param parse
 * @param fns
 * @param attrs
 * @param theme
 * @return {*}
 */
export function handleFns (parse = b, fns = _blnkArr, attrs = _blnkObj, theme) {
  // const res = pipe(...fns)(Object.assign({}, attrs, theme))
  let res = Object.assign({}, attrs)
  for (let i = 0; i < fns.length; i++) res = mergeStyles(res, fns[i](attrs, theme))
  return isEmpty(res) ? res : parse(res)
}

// create prelim Result
const emptyAttrs = _blnkObj

/**
 * createPrelimRes :: (a :: Object, b :: Object, c :: Function, d :: Array Function, e :: Object, f :: String) -> Object
 *
 * @param parent
 * @param parsedThing
 * @param parse - bss instance
 * @param fns
 * @param theme
 * @param output
 * @return {{__stylt: {tag: *, fns: *, attrs: Object}, prelim}}
 */
export function createPrelimRes (parent, parsedThing, parse, fns, theme, output) {
  const parentAttrs = parent.attrs || _blnkObj
  const preParsedFns = isEmpty(fns) ? _blnkObj : handleFns(parse, fns, emptyAttrs, theme)

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

/**
 * preCpmpute :: (a :: Object, b :: Function, c :: Array Function, d :: Object, e :: String) -> Function (compute)
 * @param prelim
 * @param parse
 * @param fns
 * @param theme
 * @param output
 * @return {function(*=)}
 */
export function preCompute (prelim, parse = b, fns = _blnkArr, theme, output) {
  const result = {}
  const noFns = isEmpty(fns)

  /**
   * compute :: (a :: Object) -> Object
   *
   * @param attrs
   * @return {object}
   */
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
    const parsedFns = hasParsedFns ? handleFns(parse, fns, filtered, theme) : {}
    const parsedAttrsCss = attrsStyle ? parse(attrsStyle) : {}

    if (output === 'style') {
      const style1 = !hasParsedAttrs ? prelim.style : mergeStyles(prelim.style, parsedAttrs.style)
      const style2 = !hasParsedFns ? style1 : mergeStyles(style1, parsedFns.style)
      result.style = !attrsStyle ? style2 : mergeStyles(style2, parsedAttrsCss.style)
      const resClass = [ prelim.className, attrsClass ].filter(a => a != null && a !== '').join(' ')
      resClass && (result.className = resClass)
    } else {
      const cls1 = !hasParsedAttrs ? prelim.className : prelim.className ? prelim.className + ' ' + parsedAttrs.class : parsedAttrs.class
      const cls2 = !hasParsedFns ? cls1 : cls1 ? cls1 + ' ' + parsedFns.class : parsedFns.class
      const cls3 = !attrsClass ? cls2 : cls2 ? cls2 + ' ' + attrsClass : attrsClass
      result.className = !attrsStyle ? cls3 : cls3 ? cls3 + ' ' + parsedAttrsCss.class : parsedAttrsCss.class
    }
    return result
  }
}

/**
 * createStyler :: (a :: Function | Object, b :: Function, c :: Object) -> Function
 *
 * @param lib
 * @param parser
 * @param m
 * @param preact
 * @param React
 * @param [outputType]
 * @param theme
 * @return {function}
 */
export const createComponentFactory = (parser = b, { m, preact, React, outputType = 'class', theme }) => {
  /**
   * styler :: (a? :: String | Object | Function, b? :: String | Object | Function, c? :: Array | Function) -> Object | Function
   *
   * @param a
   * @param b
   * @param c
   * @return {*}
   */
  return function compFactory (a, b, ...c) {
    const parent = handle1st(a || 'div')
    const parsedThing = (arguments.length > 1) ? handle2nd(b, parser) : handle2nd(a, parser)
    const fns = flattenDown([ parent.fns, a, b, c ], [])
      .filter(x => typeof x === 'function' && !x.hasOwnProperty('stylt'))

    const { prelim, __stylt } = createPrelimRes(parent, parsedThing, parser, fns, theme, outputType)
    const compute = preCompute(prelim, parser, fns, theme, outputType) // injects: parent.attrs, parsedThing

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

    if (m) return createMithrilComp(m, { __stylt, compute })
    else if (React) return createReactComp(React, { __stylt, compute })
    else if (preact) return createPreactComp(preact, { __stylt, compute })
    else throw Error('[Stylething compFactory] No renderer found in options!')
  }
}
