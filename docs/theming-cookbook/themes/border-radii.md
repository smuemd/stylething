###### [Theming Cookbook](../index.md)  >  [Typography](./index.md)

# Border Radii

There is a four step scale for border radius in addition to a utility that sets border radius to 100%, which when combined with an explicit height and width will produce a circle.

```js
// theme.js
export const radii = [
  '0',       // [0] === 0
  '.125rem', // [1] === 2px
  '.25rem',  // [2] === 4px
  '.5rem',   // [3] === 8px
  '1rem'     // [4] === 16px
]

radii.pill = '9999px'
radii.max = '100%'
```
Idiomatic usage patterns:

```js
import m from 'mithril'
import b from 'bss'
import { createStyler, dfaultTheme } from 'stylething'
import { borderRadius } from 'systemthing/core'

const styled = createStyler(b, { m })
const { radii } = dfaultTheme

const brTopStyle = b`
  borderRadiusTopLeft: ${radii[ 1 ]};
  borderRadiusTopRight: ${radii[ 2 ]};
`

const CompA = styled('div' + b`
  borderRadius ${radii[ 2 ]}
`.$notSmall`
  borderRadius ${radii[ 3 ]}
`.$large`
  borderRadius ${radii.pill}
`)
const CompB = styled(borderRadius)

const A = m(CompA, {
  bc: 'darkred'
}, 'Equivaltent to B')

const B = m(CompB, {
  bc: 'darkred',
  borderRadius: [ 2, 3, 'pill' ]
}, 'Eqivalent to A')

const C = m( 'div' + brTopStyle, 'Precise spec possible')
```
Inspiration Tachyons:

```postcss
/*

   BORDER RADIUS
   Docs: http://tachyons.io/docs/themes/border-radius/
*/

  .br0 {        border-radius: 0; }
  .br1 {        border-radius: .125rem; }
  .br2 {        border-radius: .25rem; }
  .br3 {        border-radius: .5rem; }
  .br4 {        border-radius: 1rem; }
  .br-100 {     border-radius: 100%; }
  .br-pill {    border-radius: 9999px; }
  
  .br--bottom {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
  }
  .br--top {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
  }
  .br--right {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
  }
  .br--left {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
  }
```