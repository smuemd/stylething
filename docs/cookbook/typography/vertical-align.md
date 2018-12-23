###### [Theming Cookbook](../index.md)  >  [Typography](./index.md)

# Vertical Align

[Vertical align](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align) works on inline-level elements (display inline and inline-block) and on table cells.

For more info visit [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align)

## BSS helpers

Stylething comes with an optional `align` helper method that can be made available on a BSS instance.

**`align`**

- `b.align(v)` - align inline-level elements vertically (along the y-axis).

`v` is of type `String` and must be of value `baseline` | `sub` | `super` | `text-top` | `text-bottom` | `middle` | `top` | `bottom` | `<percentage>` | `<length>`.

The `vertical-align` initial value is `baseline`.

Example

```js
b.align('top') // Vertically align to top.
b.align('middle') // Vertically align to middle.
b.align('bottom') // Vertically align to bottom.
b.align('baseline') // Vertically align to baseline (initial value).
b.align('super') // Aligns the baseline of the element with the superscript-baseline of its parent.
```

## Usage

#### Set up

Stylething BSS helpers are initialized by passing the return value of `createBssHelpers` into the `helper` function of the `b` instance.
```js
import b from 'bss'
import * as theme from 'stylething/theme.esm'
import {createBssHelpers } from 'stylething/bssHelpers.esm'

// initialize helpers
b.helper(createBssHelpers(b, theme))
```

Once initialized, Stylething BSS helpers are available on the the `b` instance.

```js
/* global b */

import m from 'mithril'
import { createComponentFactory } from 'stylething'

const styled = createComponentFactory(b, { m })

// raw styles
const fs42 = b`font-size: 42px;`
const toTop = b.align('top')
const inlinedSquare = b`
  height: .5em;
  width: .5em;
  display: inline-block;
`

// components
const HOne = styled('h1' + fs42)
const BoxyTop = styled('span.Boxy' + inlinedSquare + toTop)

// App
const App = { view: () =>
  m(HOne,[
    'Large Text',
    m(BoxyTop, { backgroundColor: 'pink' })
  ])
}

m.mount(document.body, App)
```

`vertical-align` and `verticalAlign` however remain accessible as a regular css properties.

```js
const toBase = b`vertical-alingn: baseline;`
const BoxyBase = styled(BoxyTop + toBase) // overwrites boxyTop to align at baseline
```

<!-- 
```css
/*

   VERTICAL ALIGN

*/

.v-base     { vertical-align: baseline; }
.v-mid      { vertical-align: middle; }
.v-top      { vertical-align: top; }
.v-btm      { vertical-align: bottom; }

```-->

##### Related
- [Type Scale](type-scale.md)
- [Measure](measure.md)
- [Line Height / Leading](line-heights.md)
- [Tracking](letter-spacing.md)
- [Font Weights](font-weight.md)
- [Font Style](font-style.md)
- [Text Align](text-align.md)
- [Text Transform](text-transform.md)
- [Text Decoration](text-decoration.md)
- [White Space](white-space.md)
- [Font Families](font-family.md)