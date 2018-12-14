###### [Theming Cookbook](../index.md) > [Typography](./index.md)

# Type Scale

Often times, websites devote a non-trivial amount of css to setting font-size. They declare an unnecessary amount of different font-sizes that upon inspection, don’t come close to resembling a sane type scale

To create and design an easily readable interface, you don’t need more than 40 font-sizes. A simple ratio-based scale with 8 options should suffice. Using the class extension namespaces you can set the font-size for any particular breakpoint that you desire.

Don’t spend time constantly overriding font-sizes in your css. If you don’t like a default font-size for an element, use the utilities to quickly make the text larger or smaller until it looks just right.

```js
// theme.js

const fontSizes = [
  '.75rem',   // 0
  '.875rem',  // 1
  '1rem',     // 2
  '1.25rem',  // 3
  '1.5rem',   // 4
  '2.25rem',  // 5
  '3rem',     // 6
  '5rem',     // 7
  '6rem'      // 8
]

fontSizes.subheadline = theme.fontSizes[7] // '5rem'
fontSizes.headline = theme.fontSizes[8] // 6'rem'

export { fontSizes }
```

Idiomatic usage patterns:

```js
import m from 'mithril'
import b from 'bss'
import { createStyler, dfaultTheme } from 'stylething'
import { fontSize } from 'systemthing/core'

const styled = createStyler(b, { m })
const { fontSizes } = dfaultTheme

const Box = styled('div', fontSize)
const P = styled('p', b`
  fs ${fontSizes[ 2 ]}
`.notSmall`
  fs ${fontSizes[ 4 ]}
`.large`
  fs ${fontSizes.headline}
`)

const A = m(P, 'Equivalent to B and C')
const B = m(Box, { as: 'p', fs: [ 2, 4, 'headline' ] }, 'Equivalent to A and C')
const C = m('p', {
  className: b`
    fs ${fontSizes[ 2 ]}
  `.$notSmall`
    fs ${fontSizes[ 4 ]}
  `.$large`
    fs ${fontSizes.headline }
  `.class
}, 'Eqivalent to A and B')
const D = m(Box, { fs: 'headline' }, 'Very large')
```

inspiration: Tachyons

```css
/*

   TYPE SCALE
   Docs: http://tachyons.io/docs/typography/scale/

*/

/*
 * For Hero/Marketing Titles
 *
 * These generally are too large for mobile
 * so be careful using them on smaller screens.
 * */

.f-6,
.f-headline {
  font-size: 6rem;
}
.f-5,
.f-subheadline {
  font-size: 5rem;
}


/* Type Scale */

.f1 { font-size: 3rem; }
.f2 { font-size: 2.25rem; }
.f3 { font-size: 1.5rem; }
.f4 { font-size: 1.25rem; }
.f5 { font-size: 1rem; }
.f6 { font-size: .875rem; }
.f7 { font-size: .75rem; } /* Small and hard to read for many people so use with extreme caution */

```

##### Related
- [Measure](measure.md)
- [Line Height / Leading](line-heights.md)
- [Tracking](letter-spacing.md)
- [Font Weights](font-weight.md)
- [Font Style](font-style.md)
- [Vertical Align](vertical-align.md)
- [Text Align](text-align.md)
- [Text Transform](text-transform.md)
- [Text Decoration](text-decoration.md)
- [White Space](white-space.md)
- [Font Families](font-family.md)