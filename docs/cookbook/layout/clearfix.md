###### [Theming Cookbook](../index.md)  >  [Layout](./index.md)

# Clear Fix

When floats are used for layouts - they need to be contained by a clearfix solution. This helps prevent layout problems caused by the elements being removed from the block context of the surrounding elements.

## Available BSS helpers

Stylething provides an optional `clearfix` alias `cf` helper that may be added to the BSS instance

- `b.clearfix` alias `b.cf` - Contain floats (micro clearfix)

Makes a parent element expand to contain floated children. Uses pseudo-elements (micro clearfix).

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

**contain floats with `b.clearfix` helper**

```js
/* global b */
import m from 'mithril'
import { createStyler } from 'stylething'

const styled = createStyler(b, { m })

// define components
const Container = '.Yellow' + b.clearfix.backgroundColor('#ff0')
const FloatLeft = styled('.Floaty' + b
  .float('left')
  .backgroundColor('#649632')
  .width('100px')
  .height('100px'))

// mount test
m.mount(document.body, { view: () =>
  m('.Test', [

    m('h1.Test-title', 'Stylething helpers: clearfix tests'),

    m('h2.Test-describe', 'b.clearfix'),
    m('h3.Test-it', 'contains floats'),
    m('.Test-run', [
      m(Container,[ // <- contains floats
        m(FloatLeft),
        m(FloatLeft, { marginLeft: '1em' })
      ])
    ])
  ])
})
```

<!--```css
/*

   CLEARS

*/

/* Nicolas Gallaghers Clearfix solution
   Ref: http://nicolasgallagher.com/micro-clearfix-hack/ */

.cf:before,
.cf:after   { content: " "; display: table; }
.cf:after   { clear: both; }
.cf         { *zoom: 1; }

``` -->
