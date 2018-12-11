import test from 'ava'
import cssParser from 'bss'
import { handle1st, handle2nd, handleFns, createPrelimRes, preCompute, createStyler } from '../lib/styler'
import { sortAttrs } from '../lib/util'

const Window = require('window')
const { document } = new Window()

const { TEST_CSS_PROP_OBJ } = require('./_cssProps')

// handle1st

test('handle1st creates stylt parent', t => {
  const a = handle1st('span#fromhandle1st.fn[cool]', document)
  t.deepEqual(a, {
    tag: 'span',
    attrs: {
      id: 'fromhandle1st',
      className: 'fn',
      cool: true
    }
  }, 'handles hyperscript notation')
})

test('handle1st works without arguments', t => {
  const a = handle1st()

  t.true(typeof a.tag === 'string' && typeof a.attrs === 'object')
})

test('handle1st recognises stylethings and clones their default attributes', t => {
  const obj = {
    stylt: {
      tag: 'div',
      attrs: {
        id: 'clone',
        className: 'test',
        fn: x => x
      },
      fns: [ () => 1, () => 2 ]
    }
  }

  const a = handle1st(obj, document)

  t.is(a, obj.stylt)
})

test('handle1st test element string provided via document.createElement', t => {
  const a = handle1st('wrong ', { will: 'fail with fallback' })
  const b = handle1st('table', document)

  t.is(a.tag, 'div')
  t.is(b.tag, 'table')
})

// parse

test('css parser (bss) works', t => {
  const parsed = cssParser({ fontSize: '1em' })

  t.true(typeof parsed === 'object')
  t.deepEqual(parsed.style, { fontSize: '1em' })
  t.true(typeof parsed.class === 'string')
})

// handle2nd

test('handle2nd returns bss style def obj', t => {
  const thing = cssParser({
    backgroundColor: 'pink',
    fontSize: '1.3px'
  })
  const a = handle2nd(thing, cssParser)

  t.true(typeof a === 'object')
  t.true(typeof a.class === 'string')
  t.deepEqual(a.style, {
    backgroundColor: 'pink',
    fontSize: '1.3px'
  })
})

test('handle2nd prioritises className, class attribute', t => {
  const thing = {
    className: 'test',
    fontSize: '1px'
  }

  const a = handle2nd(thing, cssParser)

  t.is(a.class, 'test', 'additional attrs not parsed')
  t.is(a.style, undefined, '1st level css attr is ignored')
})

test('handle2nd prioritises style or css attrs', t => {
  const css = {
    backgroundColor: 'pink',
    fontSize: '1.3px'
  }
  const style = css

  const a = handle2nd({ css, lineHeight: '2em' }, cssParser)
  const b = handle2nd({ className: 'test', style, backgroundColor: 'black' }, cssParser)

  t.true(typeof a.class === 'string' && typeof b.class === 'string')
  t.deepEqual(a.style, {
    backgroundColor: 'pink',
    fontSize: '1.3px'
  }, '1st level attr is ignored')
  t.deepEqual(b.style, css)
  t.is(b.class.split(' ').length, 2, 'className style / css combo is recognised')
})

test('handle2nd handles css attributes', t => {
  const thing = {
    backgroundColor: 'pink',
    fontSize: '1.3px'
  }

  const a = handle2nd(thing, cssParser)

  t.true(typeof a === 'object')
  t.true(typeof a.class === 'string')
  t.deepEqual(a.style, {
    backgroundColor: 'pink',
    fontSize: '1.3px'
  })
})

test('handle2nd handles String', t => {
  const str = 'test'
  const a = handle2nd(str, cssParser)
  t.is(a.class, str)
})

test('handle2nd handles Function arg', t => {
  const thing = x => x
  const a = handle2nd(thing, cssParser)
  t.deepEqual(a, {}, 'returns nothing (i. e. empty obj)')
})

// handle Fns

test('handleFns returns class style obj', t => {
  const fns = [
    attrs => ({ backgroundColor: attrs.backgroundColor || 'pink' }),
    attrs => ({ fontSize: attrs.fontSize || '1.3px' })
  ]

  const attrs = {
    bc: 'blue',
    fs: '1.3em',
    padding: '15px'
  }

  const { styleProps } = sortAttrs(attrs, TEST_CSS_PROP_OBJ)
  const a = handleFns(cssParser, fns, styleProps)

  t.true(typeof a === 'object')
  t.true(typeof a.class === 'string')
  t.deepEqual(a.style, {
    backgroundColor: attrs.bc,
    fontSize: attrs.fs,
    padding: attrs.padding
  })
})

test.todo('handleFns processes function, style attributes, and a theme')
test.todo('handleFns doesn\'t throw on null  / undefined values')
test.todo('handleFns clones attributes into result')
test.todo('handleFns outputs bss style definitions (parses result internally with bss)')
test.todo('handleFns returns class string')

// create Prelim

test('createPrelimRes returns correct preliminary result and __stylt obj', t => {
  const sel = 'span#fromhandle1st.One[cool]'
  // const bssObj = cssParser`
  //   backgroundColor: pink,
  //   fontSize: 1.3px,
  //   padding: 1em`
  const bssObj = {
    class: 'two',
    style: {
      backgroundColor: 'pink',
      fontSize: '1.3px',
      padding: '1em'
    }
  }
  const parent = handle1st(sel)
  const parsedThing = handle2nd(bssObj, cssParser)
  const fns = [
    attrs => ({ backgroundColor: attrs.backgroundColor || 'blue' }),
    attrs => ({ fontSize: attrs.fontSize || '7px' })
  ]

  const A = createPrelimRes(parent, parsedThing, cssParser, fns)
  const B = createPrelimRes(parent, parsedThing, cssParser, fns, {}, 'style')

  t.is(A.prelim.className.split(' ').length, 3)
  t.is(A.prelim.style, undefined)
  t.is(A.__stylt.tag, 'span')
  t.is(A.__stylt.fns.length, 2)
  t.is(A.__stylt.attrs.id, 'fromhandle1st')
  t.is(A.__stylt.attrs.cool, true)
  t.is(A.__stylt.attrs.className.split(' ')[0], 'One')
  t.is(A.__stylt.attrs.className.split(' ')[1], 'two')
  t.is(typeof A.__stylt.attrs.className.split(' ')[2], 'string')

  t.deepEqual(B.__stylt.attrs.style, { backgroundColor: 'blue', fontSize: '7px', padding: '1em' })
  t.deepEqual(B.prelim.style, B.__stylt.attrs.style)
  t.is(B.__stylt.attrs.className, 'One')
})

// preCompute / compute

test('preCompute returns compute function', t => {
  const { prelim } = createPrelimRes(
    { tag: 'div', attrs: { className: 'One' } },
    { class: 'two',
      style: {
        backgroundColor: 'pink',
        fontSize: '1.3px',
        padding: '1em'
      }
    },
    cssParser,
    [ attrs => ({ backgroundColor: attrs.backgroundColor || 'blue' }),
      attrs => ({ fontSize: attrs.fontSize || '7px' }) ]
  )

  const a = preCompute(prelim, cssParser, [
    attrs => ({ backgroundColor: attrs.backgroundColor || 'blue' }),
    attrs => ({ fontSize: attrs.fontSize || '7px' })
  ])

  t.is(typeof a, 'function')
})

test('compute returns correct className string or style object', t => {
  const parent = { tag: 'div', attrs: { className: 'One' } }
  const parsedT = {
    class: 'two',
    style: {
      backgroundColor: 'pink',
      fontSize: '1.3px',
      padding: '1em'
    }
  }
  const fns = [
    attrs => ({ backgroundColor: attrs.backgroundColor || 'blue' }),
    attrs => ({ fontSize: attrs.fontSize || '7px' })
  ]

  const A = createPrelimRes(parent, parsedT, cssParser, fns)
  const B = createPrelimRes(parent, parsedT, cssParser, fns, {}, 'style')

  const computeA = preCompute(A.prelim, cssParser, fns)

  const computeB = preCompute(B.prelim, cssParser, fns, {}, 'style')

  const a = computeA({ backgroundColor: 'red', fontSize: '2em', padding: '7px' })
  const b = computeB({ backgroundColor: 'red', fontSize: '2em', lineHeight: '2px' })

  t.is(typeof a.className, 'string')
  t.is(typeof a.style, 'undefined')
  t.is(a.className.split(' ').length, 4)
  t.is(a.className.split(' ')[1], 'two')

  t.is(b.className, 'One')
  t.is(b.className.split(' ').length, 1)
  t.is(typeof b.style, 'object')
  t.deepEqual(b.style, {
    padding: '1em',
    backgroundColor: 'red',
    fontSize: '2em',
    lineHeight: '2px'
  })
})

// createStyler

test('createStyler returns a stylt component', t => {
  const React = { createElement: (tag, props) => ({ tag, props }) }
  const m = (t, a, ...c) => ({ tag: t, vnode: { attrs: a, children: c } })
  const h = (t, a, ...c) => ({ tag: t, props: { ...a, children: c } })

  const styledR = createStyler(cssParser, { React })
  const styledM = createStyler(cssParser, { m })
  const styledH = createStyler(cssParser, { preact: { h } })
  const styledU = createStyler(cssParser, {})

  const staticStyle = { p: '12px' }
  const props = { m: '20px' }

  const rEl = styledR('div', staticStyle)
  const mEl = styledM('div', staticStyle)
  const hEl = styledH('div', staticStyle)
  const err = t.throws(() => styledU('div', staticStyle), Error)

  t.is(typeof styledR, 'function')
  t.is(typeof styledM, 'function')
  t.is(typeof styledH, 'function')
  t.is(typeof styledU, 'function')

  t.is(typeof rEl, 'function')
  t.is(rEl.stylt.tag, 'div')
  t.is(rEl.stylt.attrs.className.split(' ').length, 1)
  t.is(typeof mEl, 'function')
  t.is(mEl.stylt.tag, 'div')
  t.is(mEl.stylt.attrs.className.split(' ').length, 1)
  t.is(typeof hEl, 'function')
  t.is(hEl.stylt.tag, 'div')
  t.is(hEl.stylt.attrs.className.split(' ').length, 1)
  t.is(err.message, '[Stylething createStyler] No renderer found in options!')

  t.is(rEl(props).tag, 'div')
  t.is(rEl(props).props.className.split(' ').length, 2)
  t.is(mEl({ attrs: props }).view().tag, 'div')
  t.is(mEl({ attrs: props }).view().vnode.attrs.className.split(' ').length, 2)
  t.is(hEl(props).tag, 'div')
  t.is(hEl(props).props.className.split(' ').length, 2)
})

// stylt

test('stylt parses hyperscript', t => {
  const React = { createElement: (tag, props) => ({ tag, props }) }
  const stylt = createStyler(cssParser, { React, outputType: 'class' })

  const sel = 'span#fromhandle1st.One[cool]'
  const RComp = stylt(sel, { className: 'two', style: { backgroundColor: 'pink' } })
  // const ChildComp = stylt(RComp)
  const a = RComp({
    onClick: x => x,
    // lineHeight: '40rem',
    className: 'four',
    // css: { hoy: '30px' },
    children: 'Hello'
  })
  //  const b = ChildComp({ children: 'World', className: 'five' })

  t.is(a.tag, 'span')
  t.is(typeof a.props, 'object')
  t.is(typeof a.props.onClick, 'function')
  t.is(a.props.children, 'Hello')
  t.is(a.props.className.split(' ').length, 4)
  t.is(a.props.className.split(' ')[3], 'four')
  t.is(a.props.style, undefined)
})
