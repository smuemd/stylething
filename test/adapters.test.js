import test from 'ava'

import { createReactComp, createMithrilComp, createPreactComp } from '../lib/adapters'

const __stylt = { tag: 'span', attrs: { defaultAttribute: 'here', className: 'default' } }
const compute = (styleProps) => ({ style: styleProps.style, className: styleProps.className })
const ReactStub = { createElement: (tag, props) => ({ tag, props }) }
const MithrilStub = (t, a, c) => ({ tag: t, vnode: { attrs: a, children: c } })
const PreactStub = { h: (t, a, c) => ({ tag: t, props: { ...a, children: c } }) }

test('createReactComp creates a stylt function', t => {
  const ReComp = createReactComp(ReactStub, { __stylt, compute })

  t.true(typeof ReComp === 'function')
  t.deepEqual(ReComp.stylt, __stylt)
})

test('createMithrilComp creates a stylt function', t => {
  const MComp = createMithrilComp(MithrilStub, { __stylt, compute })

  t.true(typeof MComp === 'function')
  t.deepEqual(MComp.stylt, __stylt)
})

test('createPreactComp creates a stylt function', t => {
  const PComp = createPreactComp(PreactStub, { __stylt, compute })
  t.true(typeof PComp === 'function')
  t.deepEqual(PComp.stylt, __stylt)
})

const obj = {
  as: 'table',
  id: 'React&Mithril',
  style: { backgroundColor: 'pink' },
  className: 'test'
}

const children = undefined

const props = Object.assign({}, obj, { children })
const vnode = { attrs: obj, children }

test('calling ReactComp with props creates a DOM elmement obj', t => {
  const ReComp = createReactComp(ReactStub, { __stylt, compute })
  const res = ReComp(props)

  t.deepEqual(res, {
    tag: 'table',
    props: {
      id: 'React&Mithril',
      style: { backgroundColor: 'pink' },
      className: 'test',
      children: undefined
    }
  })
})

test('calling PreactComp with props creates a DOM elmement obj', t => {
  const PComp = createPreactComp(PreactStub, { __stylt, compute })
  const res = PComp(props)

  t.deepEqual(res, {
    tag: 'table',
    props: {
      id: 'React&Mithril',
      style: { backgroundColor: 'pink' },
      className: 'test',
      children: undefined
    }
  })
})

test('calling MithrilComp with props creates a DOM element obj', t => {
  const MComp = createMithrilComp(MithrilStub, { __stylt, compute })
  const res = MComp(vnode).view()

  t.deepEqual(res, {
    tag: 'table',
    vnode: {
      children: undefined,
      attrs: {
        id: 'React&Mithril',
        style: { backgroundColor: 'pink' },
        className: 'test'
      }
    }
  })
})
