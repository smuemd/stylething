###### [Style Cookbook](index.md)

# Custom Media Queries

Media query values can be changed to fit your own content.
  There are no magic bullets when it comes to media query width values.
  They should be declared in em units - and they should be set to meet
  the needs of your content. You can also add additional media queries,
  or remove some of the existing ones.

```js
// theme.js
export const breakpoints = [
  '30em', // [0] === 480px
  '60em'  // [1] === 960px
]
```

BSS helpers

```js
import { dfaultTheme } from 'stylething'
import b from 'bss'

const { breakpoints } = dfaultTheme

// BSS media query groupers

b.helper('$notSmall', style =>
  b.$media(`screen and (min-width: ${breakpoints[0]})`, style))

b.helper('$medium', style =>
  b.$media(
    `screen and (min-width: ${breakpoints[0]}) and (max-width: ${breakpoints[1]})`, 
    style
  )
)

b.helper('$large', style =>
  b.$media(`screen and (min-width: ${breakpoints[1]})`, style))
```

Idiomatic usage patterns:

```js
import m from 'mithril'
import b from 'bss'
import { createStyler, dfaultTheme } from 'stylething'
import { colors } from 'systemthing/core'

const styled = createStyler(b, { m })
const { fontSizes } = dfaultTheme

const CompA = styled('div', b`
  bc green
`.$notSmall`
  bc blue
`.$large`
  bc pink
`)
const CompB = styled('div', colors)
const CompC = '.div' + b`
 bc green
`.$notSmall`
 bc blue
`.$large`
 bc pink
`

const A = m(CompA, 'Equivalent to B and C')
const B = m(CompB, { bc: ['green', 'blue', 'pink']}, 'Eqivalent to A and C')
const C = m(CompC, 'Equivalent to A and B')
```

Inspiration Tachyons:

<!-- Tachyons inspiration
```postcss
/* Media Queries */
@custom-media --breakpoint-not-small screen and (min-width: 30em);
@custom-media --breakpoint-medium screen and (min-width: 30em) and (max-width: 60em);
@custom-media --breakpoint-large screen and (min-width: 60em);
```-->
