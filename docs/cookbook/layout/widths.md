###### [Theming Cookbook](../index.md)  >  [Layout](./index.md)

# Widths

The widths module contains both a five-step width scale based on powers of two as well as a series of percentage values that can be combined with floats for an infinitely nestable and fully responsive grid system.


Idiomatic usage patterns:

```js
import m from 'mithril'
import b from 'bss'
import { createStyler, dfaultTheme } from 'stylething'

const styled = createStyler(b, { m })

const Box = styled('div')
const OneThird = styled('div', b(`width: ${1 / 3}%;`))

const A = m(Box, { backgroundColor: 'yellow', width: 2 / 3 }, 'Two Thirds')
const B = m(OneThird,{ backgroundColor: 'blue' }, 'One Thirds')

// Systemthing `fit` and `fill` special values
const C = m(Box, { display: 'flex'}, [
  m(Box, { witdth: 'fit' }, [
    m(Box, { width: '100px', height: '100px', bc: 'red' }, 'Fit to box')
  ]),
  m(Box, { width: 'fill', bc: 'yellow'}, 'Fill remaining')
])
```

- BSS `fit` and `fill` helpers

(https://github.com/suitcss/utils-size/)

```js
import m from 'mithril',
import b from 'bss'

b.helper({
  fit: b('flex-basis: auto'),
  fill: b(`
    flex: 1 1 0%;
    flex-basis: 0%;`),
  fillAlt: b(`
    flex: 1 1 auto;
    flex-basis: auto;
  `),
  full: b.width('100%')
})

const D = m('div' + b`display flex`, [
  m('div' + b.fit, [
    m('div', b.width('50px').height('50px').bc('red'), 'Fit to box')
  ]),
  m('div' + b.bc('yellow').fill, 'Fill remaining')
])
```

<!-- Inspiration SuitCss - https://github.com/suitcss/utils-size/
## Available classes

* `u-sizeFit` - Make an element shrink wrap its content with `flex-basis`.
* `u-sizeFull` - Make an element the width of its parent.
* `u-sizeFill` - Make an element fill the remaining space. Distribute space evenly on multiple elements.
* `u-sizeFillAlt` - An alternative method to make an element fill the remaining space. Distribute space based on element width.
* `u-sizeXofY` (numerous) - Specify the proportional width of an object.

`X` must be an integer less than `Y`.

`Y` can be any of the following numbers: 2, 3, 4, 5, 6, 8, 10, 12.

```postcss
/*

  SUIT CSS utilities: size

*/

/* Intrinsic widths
   ========================================================================== */

/**
 * Make an element shrink wrap its content.
 */

.u-sizeFit {
  flex-basis: auto !important;
}

/**
 * Make an element fill the remaining space.
 *
 * 1. Be explicit to work around IE10 bug with shorthand flex
 *    http://git.io/vllC7
 * 2. IE10 ignores previous `flex-basis` value. Setting again here fixes
 *    http://git.io/vllMt
 */

.u-sizeFill {
  flex: 1 1 0% !important; /* 1 */
  flex-basis: 0% !important; /* 2 */
}

/**
 * An alternative method to make an element fill the remaining space.
 * Distributes space based on the initial width and height of the element
 *
 * http://www.w3.org/TR/css-flexbox/images/rel-vs-abs-flex.svg
 */

.u-sizeFillAlt {
  flex: 1 1 auto !important;
  flex-basis: auto !important;
}

/**
 * Make an element the width of its parent.
 */

.u-sizeFull {
  width: 100% !important;
}
```-->

<!-- Inspiration Tachyons
```css
/*

   WIDTHS
   Docs: http://tachyons.io/docs/layout/widths/

*/

/* Width Scale */

.w1 {    width: 1rem; }
.w2 {    width: 2rem; }
.w3 {    width: 4rem; }
.w4 {    width: 8rem; }
.w5 {    width: 16rem; }

.w-10 {  width:  10%; }
.w-20 {  width:  20%; }
.w-25 {  width:  25%; }
.w-30 {  width:  30%; }
.w-33 {  width:  33%; }
.w-34 {  width:  34%; }
.w-40 {  width:  40%; }
.w-50 {  width:  50%; }
.w-60 {  width:  60%; }
.w-70 {  width:  70%; }
.w-75 {  width:  75%; }
.w-80 {  width:  80%; }
.w-90 {  width:  90%; }
.w-100 { width: 100%; }

.w-third { width: calc(100% / 3); }
.w-two-thirds { width: calc(100% / 1.5); }
.w-auto { width: auto; }

```-->

