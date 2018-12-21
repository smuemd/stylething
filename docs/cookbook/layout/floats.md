###### [Theming Cookbook](../index.md)  >  [Layout](./index.md)

# Floats

## CSS Attributes

###`float`

[The `float` css property](https://developer.mozilla.org/en-US/docs/Web/CSS/float) is directly accessible on any BSS instance and hence on every Stylething Component as well. There are three ways to define a `float` element:

- **`<StyledComponent float={<direction>}/>`** - as attribute on a Stylething component instance
- `b({ float: <direction> })` or b(`float ${<direction>}`) - as attribute passed into a BSS instance
- `b.float(<direction>)` - as a method on the BSS instance (browser only)

Floats may be set on any element, but it will only affect elements that aren’t absolutely positioned. When you float an element you inherently set its display to block.


There are only three values (of type `String`) that can be declared for float `<direction>`:
1. `'left'`
2. `'right'`, or 
3. `'none'`. 

`float` direction can be combined with the css [`width` property](https://developer.mozilla.org/en-US/docs/Web/CSS/width) to create fluid multi-column layouts.

## BSS Helpers

Stylething provides tree optional BSS helpers that supplement the `float` attribute.

- `b.clearfix` alias `b.cf` - Contain floats (micro clearfix). Read the [clearfix recipie](./clearfix.md) for more details.
- `b.nbfc` -  Create a new block formatting context.
- `b.nbfcAlt` - Alternative technique for creating a new block formatting context.

## Usage

### Set up

**Import Stylething and external dependenies**

```bash
npm i stylething bss mithril
``` 

Stylething works in tandem with the Better Style Sheets (BSS) library and a virtual DOM layer of your choice. This example uses Mithril, but React and Preact are also supported.

**Configure the Stylething component factory**

```js
import m from 'mithril'
import b from 'bss'
import { createComponentFactory } from 'stylething'

// initialize Stylething's styled component factory
const styled = createComponentFactory(b, { m })
```
To initialise the styled component factory pass the BSS instance and virtual DOM library into the Stylething's `createComponentFactory` function.

**Setup BSS helpers**

```js
/* global m, b */
import { createBssHelpers } from 'stylething/bssHelpers.esm'
import * as theme from 'stylething/theme.esm'

b.helper(createBssHelpers(b, theme))
```

Initialize Stylething helpers by passing the return value of the `createBssHelpers` function into the `helper` method of the `b` instance.

### Floating styled components

```js
/* global m, b, theme, styled */

/* define components */

// Floats container
const Container = styled('div.Container' + b({ backgroundColor: theme.colors.yellow }).clearfix)

// Generic box
const Box = styled('div', b({ width: '100px', height: '100px', backgroundColor: theme.colors.lightGreen }))

const exampleI = { view: () =>
  m(Container,
    m(Box, { float: 'left'}), // <- float available prop on styled component
    m(Box, { 
      float: 'left',
      marginLeft: '1em'
    })
  )
}

m.mount(document.body, exampleI)
```

### Set a new block formating context
```js
/* global m, b, theme, styled */

// style Elements directly with the b instance
const floatLeft = b`
  float: left;
  background-color: ${theme.colors.lightGreen};
  width: 100px;
  height: 100px;`

const exampleII = { view: () =>
  m('div' + b({ backgroundColor: theme.colors.yellow }), [
    m('div.Left' + floatLeft),
    m('div.Nbfc' + b.nbfc, [
      m('p', 'The text should not wrap under the float.'),
      m('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut tincidunt nulla. Suspendisse semper, nisl vitae ultricies vulputate, metus tortor tincidunt neque, sed feugiat lacus ipsum eu neque. Mauris pharetra facilisis turpis, ac lacinia justo fermentum vel. Maecenas sed semper nisi. Integer sed erat nec sem mattis dignissim.')
    ])
  ])
}

m.mount(document.body, exampleII)
```



[examples](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvEAXwvW10QICsEqdBk2J4IWAA60ATsQAEWOWGm1FAciwRihadAACaGAA9iagDppxU2XIBGSlettw45y5Jnzgc6tJgZGAGFVKUMGADEMamIZAE8KHz8AmAAhFwAJGCgJGGk4BO0YHDlWB1U5NThiWNhtCDQAczdbIiyc6QAKX39GNLhM7Ny4DtsCwiKYAEpJixbxwc61NFswajUE2w61WgA3XLAoWgB3RDlCCAATC6YAbjVp2daFreXVgEEoUw2O4As5OQuEDgEigGFipzUxAwtlgAFpqFkoOs5AB6ABUcgAjHI0Si-nIjpdtBDMQAGcmkiRGNSojEAJhxeLQrAeaAsQiqciqNRgFzkAF5Ej0YMEPGFiJFonERglvIoWRYLCiUXJpBgjlzqrA4Oz6JzqABXKqqAAyYNoBvkgs2GgwRlhhIuxLkAE4AByUow3BQYaQNeqnUlyDCW2h3GZoDnyIRQ+rhQ4BOACuz4ahgXVoTkHWgBE0wMBWuxbbMBU6wAvhjNZhPEABKEAaJGTNpLxFOukbxErkb18liiOOKQaza2tiiAGsGioDWgLsFDtJTgBiMBgUn3KvyKcwJgAZQAjgbfTARwADfFj6iT6ez+cyZcANgALC6HwBmOk3fGO51kz1ftB-nGBsmz-KkblPCMozkQwjmCYQTGbfBXmoTcYJgOD6EYEwPkLFoUNwxU0GVTUeT5OgxREHUe0zeQUloIxk25WALi2fB6OpOQAGo5G3PdD2PKDezkeDY0MaQmK1Xk2NEjB6lyGkeP7KBDiOIduJ8LC5LQeMc2IOAIzQ3Tc0ksi2LzAtFN4vx+KPPwNNbCziCE2i5GMutTJYtj607Ky+LQA87JPHjWx8kgXM5AA5FZqE86S1HwaLVis2DROMZy0KS6hcLi1iEqy3CUowtKTEMmjOQAFXgQtvB2CAMNODpJgFAA+fEsDYqqqisw1jSwM1YgtYgEmQfF-g6tRCExfAuuIWFiC0WBkVGwD-jWtRdykupGh8FwKgoMa1omjB1kOta5G8HR80QM7zvWkhiAkOBEGVf1tANFoKJROAsANIoLm+rbzkaFEYVoWwUSwDAqlyFELloag4BROhaHHWxaFRlFQUGy0UVbOB8CwC5TtWu61qhP0YDbCoAH0YQwNBxzUdhbv+GlW1VGAEQkerXAjc6AF1JgO0m5EOkjWw6AAeQE-GiCB6Ba-mjq2Qg6Rm6rYWuOBfAgWwYGRNRW3uEXzomwg3w1qpYS0ZaFC2OhrkNqXNrI0VQhEJQa35YAZYgOWFsV0oURak32ZrJMKI9hgaSF02VYS2bYWkGdltujrZPk6RZTkbDiA+Bs0AhBFhGkGl2DkFayfGjoOJz1sIXLUwSgSI2I7kJuTdZioqsQ-XiCOHc0BJ6v7bri6vb0iEOxIcvW-x1UQNMZXBZXuQ48Ow7zctpPbZG+21Edg3W82bwG7kP2A4VtAWpKSYw8nxM5CyCYY-X4Wt86zWU+Hkb046TO4kc55wLg0IuFQS6MDLi3Su3cJr4Ccn5GyAUBL2RCjWJy8926dw-qLc6ahe7yH7oPJgI9q7wLCs3Hi-lArHgcjWShWC9JJhnsvIWh0N6i0-pNHems96VwPkfQ2LRJaXy5oHG+99hbh2Yc-WAOA36cLNl-a2P8054PtoA3IwD0qgPAYfEQCkYFV3IeZfMVDrJD1oWgx+xBMEVAXjg+OZMCHpTsFTEhv84HeSXkgqxqDgq2MYQ49urD7jsNFkota4sVTUFgL6SARhuFqytnNbWut9bCNTPE6QiSu6i23qkm2XwBGHy0vUJM+NY64OUYnb+qc-4aIzuUoBsCNE13ciaGppjOk5yhn6eoTkSRFHLmvf4Qt-gcO6ZMgpqt1ZJ3SboTJJ9kIxTkAAMhTART4+TakWyKfw5AgjaBOxWShB+3RkhJgwOhDUYMrxKBkFDYgC0doxnStU5xB8ilqMaWTCagIdhWWUqpIc+AfyEA6E+ckws2mjw6p06Zd0OpZT+aPA+EhDYVXGLnNxcBCAWigHyNAtB5BHDVBIOQM5rgSUKLY-Auz0UTUxa3E0MgihyAgE9A0ih4YLi5FoYMOBhqaUzOIqmBoJIYEBDzHW9RhxZC0PgESaokyWlzvUaglwZzyDQAaFSGBlW7iNDkWcQI4AngtZIbRMEgRQDkHVKEJ59XEF0Fq+ADr9USEtMkBIwqjS508DIDVkZtUMHQoeGACQLV8jADAA0-oAgdyiAGrlcAeXPwNBGv6yqACyIZdBJgkIQY8rqblgCiNAIEQJc6StlQkKIyatWWBubwI0MQlC5AUcQDNewoB5owFzJg0MuS8lHdaiSlg4AQGVQASWEA0XIo6+S5CTYYWKVqfQvJrYCMB5rxAMrGWtCJZMT3Htwck3h1tDnHNORUfCMVCrSKFFc4Mty7CHAeWAJ5ARXnDneSYT53CfkNLhcirYgLgUDjUg0cFRJIXQtJLCkx-yOiIq+cogqnw0Xwq2CynuOK85cgJfq4lpKCQUqpbOJddLWyHow+BtQ+G1Bsr8IoNNGa+XBunfILgIqOTip7VKmVQJm0KqgEqlVI71WvK1RcHVMF9WgiNSapggIXCWqKO0BIU77WOsHVSz4breaeuyD6xgfqJVJhiLIYNsmw26pgJG6NY640JogEm0EvVOXcsUPG7NMAB2SprcW0taolCVok9O6zdagQNtil5+oHm5BtuNJ26Q3be1ZAHUOzASYY3jvaLa6dc6F1LoK6uxzG6OXPIWkmXdU7p1YEPd3M9q8pn4giawIizWsAWgYB0eGhpu34HRhceIchZoRkoCAC1sB5Z6jwE+N8iAADsbAOAgEwDgPAqYXAzfecwHg6IMR6GuJAQwk3qqMiIidv4GJsUnjUIsvWBsRK7l3JpHVuR7tMgsKki6+I6DfekMneAVNTiMGti9-WAFutsgR0UmHMBECIH1t++yvxVqHepsD0uHQodpPgBkqYAF-h46gTbSMbGRCQ81sjuHt20Ronu5NnFahbbvc+xTn7gFcRESR8TpZJ4sfk-65TvwFrqaE+KYzxHu82xo-zOywH2OsK06+-jmXyPmpmAIHrzXUCCd8OcmTw3uQqfdG7XT69XYLDw6VMz1nj3cWcgWsQWAv2BdJ3d7AVX-xLzXn6xcZcO4YBm7oAuZcLoY9m+-QwWEFbNBQHBFyBmcBYQWt0GAOPWFM8QAAF4o7kHSIoZv+n+nAXST0chSRm4kNKwEjRTjV-AvbpnLO+ds5PITgEQuuUSODLOZ+RgcjRACNfDVHv4Be-l-T-v+sRYHK8BeCcU5g+h53Gb9G0gaWwibqcAArFSLktAJN8iXA+K-Eez-3jkJf6-+J49zST9AVPcB0+Z9yBAHPT+8+DyXlOHRiJXL19Erxbxrzr3xAbyuHlUDHwFW0Pw5Vby9Hbzn2hwXxFz-wT2nSL1OGmiQKwFAIGXAQfEgJL3-DQMd07xxG73NwkmYhnz5z+zQEFx1mF1R3R3ZSXwV04OV0xyB1v0XHvxjxdDN3UxBDBFOHqAk0MFhHuXHGIMr2TkAKxEoNWk0DQAdHg1ODfHUP+DznmjVEzAxywFOANAkHaGoGhnD3txmzm3EWvgQB4FWxW0xDYAFlYCAA)

Related
 - [Clearfix recipe](clearfix.md)
 - Tachyons [floats](http://tachyons.io/docs/layout/floats/) and [clearfix](http://tachyons.io/docs/layout/clearfix/) docs
 - Suit Css [utils-layout](https://github.com/suitcss/utils-layout/)

<!--```css
/*

   FLOATS
   http://tachyons.io/docs/layout/floats/
   
   1. Floated elements are automatically rendered as block level elements.
         Setting floats to display inline will fix the double margin bug in
         ie6. You know... just in case.
   
   2. Don't forget to clearfix your floats with .cf

*/



.fl { float: left;  _display: inline; }
.fr { float: right; _display: inline; }
.fn { float: none; }

```-->
