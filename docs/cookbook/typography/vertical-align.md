###### [Theming Cookbook](../index.md)  >  [Typography](./index.md)

# Vertical Align

Vertical align works on inline-level elements (display inline and inline-block) and on table cells.

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

### Set up

Stylething BSS helpers are initialized by passing the return value of `createBssHelpers` into the `helper` function of the `b` instance.
```js
import b from 'bss'
import { dfaultTheme, createBssHelpers } from 'stylething'

// initialize helpers
b.helper(createBssHelpers(b, dfaultTheme))
```

## Usage

Once initialized, Stylething BSS helpers are available on the the `b` instance.

```js
/* global b */
import m from 'mithril'
import { createStyler } from 'stylething'

const styled = createStyler(b, { m })

// components
const HOne = 'h1' + b.fs('42px')
const BoxyTop = styled('span.Boxy', b
  .display('inline-block')
  .align('top') // <- your helper in action, right there!
  .width('.5em')
  .height('.5em')
  .marginLeft('.5em'))

m.mount(document.body, { view: () =>
  m(HOne, [
    'Large Text',
    m(BoxyTop, { backgroundColor: 'pink' })
  ])
})
```

`vertical-align` and `verticalAlign` however remain accessible as a regular css properties.

```js
const BoxyBase = styled('span.Boxy', b(`
  display: inline-block;
  vertical-align: baseline; // <- vanilla css prop
  width: 0.5em;
  height: 0.5em;
  margin-left: .5em;
`))
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