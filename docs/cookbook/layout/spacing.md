###### [Theming Cookbook](../index.md)  >  [Layout](./index.md)

# Spacing

Spacing comes in two flavors. Depending on borders and background colors, the difference between padding and margin can be invisible to the naked eye of the user. But to a developer, they serve different roles. Most codebases lack a ratio based scale and instead are littered with values that are just magic numbers. This is bad.

...features a spacing scale based on powers of two that starts at .25rem (for most devices this will be the equivalent of 4px). Since tachyons uses rem units with px as a fallback, if a user has declared a different base font-size for their device, your spacing will scale based on a defined ratio that has stood the test of time. As powers of two will always produce integers, there will be no problems with sub pixel rendering across browsers. Computers aren’t that great at math and so decimals lead to inconsistencies across platforms. Inconsistencies should be avoided where possible. You’ll find that when using a well thought out scale - things just line up. It works, with little effort, regardless of your design knowledge or sensibilities.

```js
// theme.js
export const space = [
  '0', // [0]
  '.25rem', // [1]
  '.5rem', // [2]
  '1rem', // [3]
  '2rem', // [4]
  '4rem', // [5]
  '8rem', // [6]
  '16rem' // [7]
]
```

- bss helper

```js
import b from 'bss'

// spacing helpers
b.helper({
  px: v => b`
    paddingRight: ${v || '0'};
    paddingLeft: ${v || '0'};
  `,
  py: v => b`
    paddingTop: ${v || '0'};
    paddingBottom: ${v || '0'};
  `,
  mx: v => b`
      marginRight: ${v || '0'};
      marginLeft: ${v || '0'};
    `,
  my: v => b`
    marginTop: ${v || '0'};
    marginBottom: ${v || '0'};
  `
})
```

## Examples

### Paddings

```js
import m from 'mithril'
import b from 'bss'
import { createStyler, dfaultTheme } from 'stylething'
import * as core from 'systemthing/core'

const styled = createStyler(b, { m })
const { space } = dfaultTheme


const Dynamic = createStyler('div', core.space)

const PadAll3 = styled('div', b`padding: ${space[3]};`) // { padding: '1rem}
const PadAll2 = styled('div', b`
  pt ${space[2]} // { paddingTop: '0.5rem' }
  pb ${space[2]} // { paddingBottom: '0.5rem' }
  pr ${space[2]} // { paddingRight: '0.5rem' }
  paddingLeft: ${space[2]} // { paddingLeft: '0.5rem' }
`)
const PadHori2 = styled('div', b`padding 0 ${space[2]} 0 ${space[2]}`)

const A = m(PadAll3, 'Equivalent to B, C, D')
const B = m(Dynamic, { padding: 3 }, 'Equivalent to A, C, D')
const C = m(PadTop2, 'Equivalent to A, B, D')
const D = m(Dynamic, { pt: 2, pb: 2, pr: 2, pl: 2 }, 'Equivalent to A, B, C')
const E = m(PadHori2, 'Equivalent to F and G')
const F = m(Dynamic, { px: 2 }, 'Equivalent to E and G')
const G = m('div' + b.px(space[2]), 'Equivalent to E & F')
```

### Margins

_[todo]_

<!-- Tachyons inspiration
```css
/*
   SPACING
   Docs: http://tachyons.io/docs/layout/spacing/

   An eight step powers of two scale ranging from 0 to 16rem.

*/

/* Variables */

:root {
  --spacing-none: 0;
  --spacing-extra-small: .25rem;
  --spacing-small: .5rem;
  --spacing-medium: 1rem;
  --spacing-large: 2rem;
  --spacing-extra-large: 4rem;
  --spacing-extra-extra-large: 8rem;
  --spacing-extra-extra-extra-large: 16rem;
}

```-->
