import test from 'ava'
import suite from 'chuhai'

import cssParser from 'bss'

import {
  handle1st,
  handle2nd,
  handleFns,
  createPrelimRes,
  preCompute,
  createStyler
} from '../lib/styler'

import { compileSelector, isEmpty, mergeStyles, sortAttrs } from '../lib/util'

const { TEST_CSS_PROP_OBJ } = require('./_cssProps')

const Window = require('window')
const { document } = new Window()

// handle1st

test.only('handle 1st', suite.macro, t => {
  let res
  const sel = 'span#fromhandle1st.fn[cool]'

  t.cycle(() => {
    t.deepEqual(res, {
      tag: 'span',
      attrs: {
        id: 'fromhandle1st',
        className: 'fn',
        cool: true
      }
    }, 'handles hyperscript notation')
  })

  t.bench('handle1st (prod)', () => {
    res = handle1st(sel, document)
  })

  t.bench('util.compileSelector', () => {
    res = compileSelector(sel)
  })
})

// bss

test('bss works under the hood', suite.macro, t => {
  let res
  const style = { fontSize: '1.5em', backgroundColor: 'pink' }
  const str = `
  fontSize 1.5em
  backgroundColor pink`

  t.cycle(() => {
    t.true(typeof res.class === 'string')
    t.deepEqual(res.style, {
      fontSize: '1.5em',
      backgroundColor: 'pink'
    })
  })

  t.bench('parse Object', () => {
    res = cssParser(style)
  })

  t.bench('parse String', () => {
    res = cssParser(str)
  })
})

// handle2nd

test('handle2nd', suite.macro, t => {
  let res
  t.cycle(() => {
    t.true(typeof res === 'object')
    t.true(typeof res.class === 'string')
    t.deepEqual(res.style, {
      backgroundColor: 'pink',
      fontSize: '1.3px'
    })
  })

  t.bench('handle2nd processes bss obj', () => {
    // const bssObj = parse`
    //   fontSize 1.3px
    //   backgroundColor pink`
    const bssObj = {
      class: 'bf0fuy71',
      style: {
        backgroundColor: 'pink',
        fontSize: '1.3px'
      }
    }
    // const bssObj = { className: 'bbu6m9g1' }
    // const bssObj = {
    //   css: {
    //     backgroundColor: 'pink',
    //     fontSize: '1.3px'
    //   }
    // }
    // const bssObj = {
    //   backgroundColor: 'pink',
    //   fontSize: '1.3px'
    // }
    // const bssObj = 'klskdjf12'

    res = handle2nd(bssObj, cssParser)
  })
})

// handleFns

test('handleFns', suite.macro, t => {
  let res
  const fns = [
    attrs => ({ backgroundColor: attrs.backgroundColor || 'pink' }),
    attrs => ({ fontSize: attrs.fontSize || '1.3px' })
  ]
  const attrs = {
    bc: 'blue',
    fs: '1.3em',
    padding: '15px',
    foo: 'bar'
  }

  t.cycle(() => {
    t.true(typeof res === 'object')
    t.deepEqual(res.style, {
      backgroundColor: attrs.bc,
      fontSize: attrs.fs,
      padding: '15px'
    })
  })

  t.bench('handle fns (production)', () => {
    const { styleProps } = sortAttrs(attrs, TEST_CSS_PROP_OBJ)
    res = handleFns(cssParser, fns, styleProps)
  })

  const alt = (Fns, Props) => {
    let ret = isEmpty(Fns)
      ? {}
      : fns.reduce((acc, f) => mergeStyles(acc, f(Props)), Props)
    return isEmpty(ret) ? ret : cssParser(ret)
  }

  t.bench('handle fns (alternative)', () => {
    const { styleProps } = sortAttrs(attrs, TEST_CSS_PROP_OBJ)
    res = alt(fns, styleProps)
  })
})

// createPrelimRes

test('createPrelimRes', suite.macro, t => {
  let resA
  let resB
  const sel = 'span#fromhandle1st.One[cool]'
  // const bssObj = parse`
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

  t.cycle(() => {
    if (resA) {
      t.is(resA.prelim.className.split(' ').length, 3)
      t.is(resA.prelim.style, undefined)
      t.deepEqual(resA.prelim.class, resA.__stylt.attrs.class)
      t.is(resA.__stylt.fns.length, 2)
      t.is(resA.__stylt.attrs.id, 'fromhandle1st')
      t.is(resA.__stylt.attrs.cool, true)
      t.is(resA.__stylt.attrs.className.split(' ')[0], 'One')
      t.is(resA.__stylt.attrs.className.split(' ')[1], 'two')
      t.is(typeof resA.__stylt.attrs.className.split(' ')[2], 'string')
    }
    if (resB) {
      t.is(resB.prelim.className.split(' ').length, 1)
      t.deepEqual(resB.prelim.class, resB.__stylt.attrs.class)
      t.deepEqual(resB.prelim.style, resB.__stylt.attrs.style)
      t.deepEqual(resB.__stylt.attrs.style, { backgroundColor: 'blue', fontSize: '7px', padding: '1em' })
      t.is(resB.__stylt.attrs.className, 'One')
    }
  })

  t.bench('createPrelimRes w/ class output', () => {
    resA = createPrelimRes(parent, parsedThing, cssParser, fns)
  })

  t.bench('createPrelimRes w/ style output', () => {
    resB = createPrelimRes(parent, parsedThing, cssParser, fns, {}, 'style')
  })
})

// precompute

test('precompute', suite.macro, t => {
  let resA
  const fns = [
    attrs => ({ backgroundColor: attrs.backgroundColor || 'blue' }),
    attrs => ({ fontSize: attrs.fontSize || '7px' })
  ]

  t.cycle(() => {
    if (resA) t.is(typeof resA, 'function')
  })

  t.bench('preCompute', () => {
    const { prelim } = createPrelimRes(
      { tag: 'div', attrs: { className: 'One' } },
      {
        class: 'two',
        style: {
          backgroundColor: 'pink',
          fontSize: '1.3px',
          padding: '1em'
        }
      },
      cssParser,
      fns
    )
    resA = preCompute(prelim, cssParser, fns)
  })
})

// compute

test('compute', suite.macro, t => {
  let resA
  let resB

  const parent = { tag: 'div', attrs: { className: 'One' } }
  const parsedThing = {
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
    // attrs => ({ other: attrs.other || '999px' })
  ]

  const A = createPrelimRes(parent, parsedThing, cssParser, fns)
  const B = createPrelimRes(parent, parsedThing, cssParser, fns, {}, 'style')
  const computeA = preCompute(A.prelim, cssParser, fns)
  const computeB = preCompute(B.prelim, cssParser, fns, {}, 'style')

  const stylProps = {
    backgroundColor: 'red',
    fontSize: '2em',
    padding: '7px',
    other: 'other via fns'
    // css: { lineHeight: '1.5em' }
  }

  t.cycle(() => {
    if (resA) {
      t.is(typeof resA.className, 'string')
      t.is(typeof resA.style, 'undefined')
      t.is(resA.className.split(' ').length, 4)
      t.is(resA.className.split(' ')[1], 'two')
    }

    if (resB) {
      t.is(resB.className, 'One')
      t.is(typeof resB.style, 'object')
      t.deepEqual(resB.style, {
        padding: '7px',
        backgroundColor: 'red',
        fontSize: '2em',
        // lineHeight: '1.5em',
        other: 'other via fns'
      })
    }
  })

  t.bench('compute w/ class output', () => {
    resA = computeA(stylProps)
  })

  t.bench('compute w/ style output', () => {
    resB = computeB(stylProps)
  })
})

// createStyler / stylt

test.skip('stylt', suite.macro, t => {
  let res
  const React = { createElement: (tag, props) => ({ tag, props }) }
  const stylt = createStyler(cssParser, { React, outputType: 'class' })

  const sel = 'span#fromhandle1st.One[cool]'
  const RComp = stylt(sel, { className: 'two', style: { backgroundColor: 'pink' } })

  t.cycle(() => {
    if (res) console.log(res)
    t.pass()
  })

  t.bench('stylt component def', () => {
    stylt(sel, { className: 'two', style: { backgroundColor: 'pink' } })
  })

  t.bench('stylt standard exec', () => {
    res = RComp({
      paddingTop: Math.round(Math.random() * 1000) + 'px',
      onClick: x => x,
      // lineHeight: '40rem',
      className: 'four',
      // css: { hoy: '30px' },
      children: 'Hello'
    })
  })
})
