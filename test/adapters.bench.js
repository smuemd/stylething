import test from 'ava'
import suite from 'chuhai'

import { createReactComp, createMithrilComp } from '../lib/adapters'
import { sortAttrs } from '../lib/util'

const cacheObj = {}
const __stylt = { tag: 'span', attrs: { defaultAttribute: 'here', className: 'default' } }
const compute = (styleProps) => ({ style: styleProps.style, className: styleProps.className })
const ReactStub = { createElement: (tag, props) => ({ tag, props }) }
const MithrilStub = (t, a, c) => ({ tag: t, vnode: { attrs: a, children: c } })

// create component

test('create components', suite.macro, t => {
  let res
  t.cycle(() => {
    t.true(typeof res === 'function')
    t.deepEqual(res.stylt, {
      tag: 'span',
      attrs: {
        defaultAttribute: 'here',
        className: 'default'
      }
    })
  })

  t.bench('createReactComp', () => {
    res = createReactComp(ReactStub, { __stylt, compute })
  })

  t.bench('createMithrilComp', () => {
    res = createReactComp(MithrilStub, { __stylt, compute })
  })
})

// Call component

test('call react components', suite.macro, t => {
  const ReactComp = createReactComp(ReactStub, { __stylt, compute })
  const MithrilComp = createMithrilComp(MithrilStub, { __stylt, compute })
  const ReactCompManual = function (props) {
    const { styleProps, rest } = sortAttrs(props)
    const stylePropsStr = JSON.stringify(styleProps)
    const $cached = cacheObj[stylePropsStr]
    const computed = $cached || compute(styleProps)
    const Attrs = Object.assign(rest, computed)

    if (!$cached) cacheObj[stylePropsStr] = computed

    return ReactStub.createElement(props.as || __stylt.tag, Attrs)
  }

  const attrs = {
    as: 'table',
    id: 'React',
    style: { backgroundColor: 'pink' },
    className: 'test'
  }

  let res
  t.cycle(() => {
    t.pass(res, {
      tag: 'table',
      props: {
        id: 'React',
        style: { backgroundColor: 'pink' },
        className: 'test'
      }
    })
  })

  t.bench('call react component', () => {
    res = ReactComp(attrs)
  })

  t.bench('call mithril component', () => {
    res = MithrilComp.view({ attrs })
  })

  t.pass('call manually constructed react component', () => {
    res = ReactCompManual(attrs)
  })
})
