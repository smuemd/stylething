###### [Style Cookbook](index.md)

# Media Queries

Media query values can be changed to fit your own content.
  There are no magic bullets when it comes to media query width values.
  They should be declared in em units - and they should be set to meet
  the needs of your content. You can also add additional media queries,
  or remove some of the existing ones.

## BSS helpers

Stylething comes with support for three default media query helpers.

- `b.$notSmall(style)` - from `30em` and up
- `b.$medium(style)` - between `30em` and `60em`
- `b.$large(style)` - more than `60em`

### Setup

Default BSS media query groupers are initialized by passing the return value of  `createBssHelpers` into the `b.helper` function.
```js
import b from 'bss'
import { dfaultTheme, createBssHelpers } from 'stylething'

// initialize helpers
b.helper(createBssHelpers(b, dfaultTheme))
```

## Usage

Once initialized, default query groupers are available on the the BSS instance.

```js
/* global b */
import m from 'mithril'
import { createStyler } from 'stylething'

const styled = createStyler(b, { m })
const Component = styled('div', b('bc green').$notSmall('bc blue').$large('bc pink'))

m.mount(document.body, { view: () =>
  m(Component, 'backgroundColor: green -> blue -> pink')
})
```

<!-- Tachyons inspiration
```postcss
/* Media Queries */
@custom-media --breakpoint-not-small screen and (min-width: 30em);
@custom-media --breakpoint-medium screen and (min-width: 30em) and (max-width: 60em);
@custom-media --breakpoint-large screen and (min-width: 60em);
```-->
