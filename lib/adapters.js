import { I, isEmpty, sortAttrs } from './util'

// debug
// const fromView = '[from view:]'
/**
 * NO_ATTRS_STR :: String
 *
 * @type {string}
 */
export const NO_ATTRS_STR = JSON.stringify({})

/**
 * styltFallback :: Object
 *
 * @type {{tag: string, attrs: {}}}
 */
const styltFallback = { tag: 'div', attrs: {} }

/**
 * createMithrilComp :: (Function, Object) -> MithrilComponent
 *
 * @param m - Mithril instance
 * @param __stylt - stylething static reference
 * @param compute - stylething dynamic style computation function
 * @return {function({attrs?: *, children?: *}): {view: (function(): *)}}
 */
export function createMithrilComp (m, {
  __stylt = styltFallback,
  compute = I
}) {
  const cacheObj = { [NO_ATTRS_STR]: __stylt.attrs }

  function Comp ({ attrs, children }) {
    const { styleProps, rest } = isEmpty(attrs) ? {} : sortAttrs(attrs)
    const stylePropsStr = styleProps ? JSON.stringify(styleProps) : NO_ATTRS_STR
    const $cached = cacheObj[stylePropsStr]
    const computed = $cached || compute(styleProps)
    // const Attrs = Object.assign(rest, computed)

    if (!$cached) cacheObj[stylePropsStr] = computed

    return {
      view: function () {
        return m(attrs.as || __stylt.tag, Object.assign(rest || {}, computed), children)
      }
    }
  }

  Comp.stylt = __stylt

  return Comp
}

/**
 * createReactComp :: (Object, Object) -> ReactComponent ( memo(function) )
 *
 * @param React - React instance
 * @param __stylt - stylething static reference
 * @param compute - stylething dynamic style computation function
 * @return {*}
 */
export function createReactComp (React, {
  __stylt = styltFallback,
  compute = I
}) {
  const cachedProps = { [NO_ATTRS_STR]: __stylt.attrs }
  // const cachedEls = {}
  const memo = React['memo'] ? React['memo'] : I

  const Comp = memo(function ReactComp (props) {
    // console.log(':::::::::::::::::: React @render ::::::::::::::::::')
    // console.log(fromView, 'cacheObj before', cacheObj)
    // const propsStr = JSON.stringify(props)
    // if (cachedEls[propsStr]) return cachedEls[propsStr]

    const { styleProps, rest } = sortAttrs(props)
    const stylePropsStr = JSON.stringify(styleProps)
    const $cached = cachedProps[stylePropsStr]
    const computed = $cached || compute(styleProps)
    const Attrs = Object.assign(rest, computed)

    if (!$cached) cachedProps[stylePropsStr] = computed

    // console.log(fromView, 'vnode.attrs', attrs)
    // console.log(fromView, 'sorted attres styleProps', styleProps)
    // console.log(fromView, 'sorted attrs rest', rest)
    // console.log(fromView, '$cached styleProps (pre compute)', $cached)
    // console.log(fromView, 'computed styleProps', computed)
    // console.log(fromView, 'triggerd recompute?',
    //   $cached === computed ? 'No' : 'Yes')
    // console.log(fromView, 'final Attrs', Attrs)
    // console.log(fromView, 'cacheObj after', cacheObj)
    // // console.log(fromView, 'vnode.children', children)

    return React.createElement(props.as || __stylt.tag, Attrs)
    // cachedEls[propsStr] = El
    // return El
  })

  Comp.stylt = __stylt

  return Comp
}
