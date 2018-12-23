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

### import
**Import Stylething and external dependenies**

```bash
npm i stylething bss mithril
``` 

Stylething works in tandem with the Better Style Sheets (BSS) library and a virtual DOM layer of your choice. This example uses Mithril, but React and Preact are also supported.

### Set up

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
const Container =
  styled('div.Container' + b(`backgroundColor: ${theme.colors.yellow};`).clearfix)

// Generic box
const Box = styled('div' + b`
  width: '100px';
  height: '100px';
  backgroundColor: ${theme.colors.lightGreen};`)

const exampleI = { view: () =>
  m(Container,
    m(Box, { float: 'left' }), // <- float available prop on styled component
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
const yellowBg = b('backgroundColor: ' + theme.colors.yellow + ';')
const greenSquare = b`
  background-color: ${theme.colors.lightGreen};
  height: 100px;
  width: 100px;`
const nbfc = b.nbfc
const floatLeft = b('float: left;')

const exampleII = { view: () =>
  m('div' + yellowBg, [
    m('div.Left' + floatLeft + greenSquare),
    m('div.Nbfc' + nbfc, [
      m('p', 'The text should not wrap under the float.'),
      m('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut tincidunt nulla. Suspendisse semper, nisl vitae ultricies vulputate, metus tortor tincidunt neque, sed feugiat lacus ipsum eu neque. Mauris pharetra facilisis turpis, ac lacinia justo fermentum vel. Maecenas sed semper nisi. Integer sed erat nec sem mattis dignissim.')
    ])
  ])
}

m.mount(document.body, exampleII)
```



[examples](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvEAXwvW10QICsEqdBk2J4IWAA60ATsQAEWOWGm1FAciwRihadAACaGAA9iagDppxU2XIBGSlettw45y5Jnzgc6tJgZGAGFVKUMGADEMamIZAE85VgdVOTU4YljYbQg0AHM3K085b19-RgAhFwAJGCgJGGk4BKT1NIyYLNyAemc4atr6uHx4LHyPGwAqOQxG7RgcZpTWzMJsnM7ZnCG4EYsLWyIauukAChKAmArew4Hj2wo5DZgASifdtCE0uSWYABM5AF4fH5zsEPGFiJFonFbvdvIpWK80BZOp05NIMAB3L7pWBwCwfeTUACuaVUABkMLFaET5IDbMcNBgjABaDEQH7aRByACcAA4AAwSIwAbgUGGkOWyXP5UxptGFakRBJ89GIGGy4SgtACjTp+GoYHx9E+YC1ATJMDAtLsDNN2uIXNgVoVSuN8jtAQAShAciQATa1B6HWifSQXUa0J9YjUtRiyjl-fS1LYogBrHIqIloH7BLXSLkAYjAYH5iojnwzMCYAGUAI5E8UwRPHAAGFjkdjTGep2dzMkLADYACzcgcAZgATML23I2RzCFyAIz8wUimeEGCh+TL1fCluuyPyQwY4LCEyJ-BoWxgajlo8wE+q4zEACCUGt+yvN7fxDeKOxbR-HQYIiHi7xunIZS0EY-rfD8DL4FBRhqHIADUciVjW9aNgenynmq2T1LBOK-Ah+HqoY0goeh0ZQLG8ZoSqDAUZq9pwIid5yKx5rEYBCEWla1EYX4WENn4jFBgJxC4fI3HEJ6vGwPBaj4N6vqmIxmFoHWYlNuhQZqSQMlyAActe1CKaRKlmTeQnHvhz7GTZ1A-pZyn4M5P52Q+DkmBx4GHnIAAq8DWt4ABuEAPlyxxPACAB8M5YAhIVpEJxKklgFJUjS9zIDOHbJWohCLvgqXEMyxBaLAah5QVHYpNWJEdAm1AuCkFD1YVDIYLVXUNd4OiWog-UNQ1xXEMQEhwIgKKStoRL7MBnTbEScw-CtzUrF0tharYnRYNMjDSJ0Py0G1nR0LQqa2LQ12dFAlLUsQnRBoMWA-H1aBjT9Dzijk7RcmoAD6u0YGgqZqOwo0pEoZryH41AwBIUWuIiY0ALpPJ130NfV-5BscAA8PwQIjVX0PF6MNUVhATmVoXMj88C+BAtgwLVKRBoqONjbTY4M2kzJaJzyAKAydDM5zahE01gGgqEIhw-a-zACTZMwNEECU4knTxTzKFvSqIEMChWO8zTKWM9IWai-1yXkYR0iwg8z5vj6aBA0jwhUQkdW479yVIS7QZA06GnsFz8ONOHPMw2oIXnuzxAYlWaBfb93XB0UysBEDujqShkeBtHIaF9TmMV3I5v1fV-OCxVIt5eLaiSxz9zJsc3ih3I6vk9raDxQkTwG7nxCNDUcwiGb2N11bQs2+n-uB8cjuUS7jAmO7OSeyk3vHUXy+Z0V+BSUJWk6Y2Enw1JHdG7Hs8Bz9CfPnY7Sp0wGfHwhhkaehF-YXEvpeGv876lwLiQRUWN6o1yfnPYqAtyrC1MM3Iqbdpb7EJn3TWFNB4j2xobUuk8cCm2ro-Pm88KqLztk-bqa96gbzdlAD2XsRD1EPnIfKtDLYqTPppES2lAF6THrfKObE5APwtr9F+Sd35py-ivFSv9z4CMvkAseoCxE6jLpAp40Cn6wLGvjVE1BYDikgEYeBdMG5MxZrodmGD9RmOkBYuOT965IKbpwveqoKKNDejPKRLcbHUKPhQ+hztOEw2SnJMk5Dv6xJdodCU2QpJA0XHMIuVcOxYw7DA+JeT3EMmsUg5mcBWYOI7p+cycgABkdhLzmS8gUluhBEGMy8WLNBtApZVMabZAhQJSjwCmHIY8dgtTUFTEoGQh1JqrCYpvDShieEhNtmEnhpNwpCVovRHI+A5zaGOEOFc2MoncO6rElpFDnIbMURIaWQUNyu3PHAQg1IoB-DQLQeQGJ0QSDkFmZm0gHjPKDPgNxmceEPI7mSGQcw5AQGmkSRQZ08xfC0FMHAxB7gfBwe0IkIKMCkxRuUhZNQtD4DkIEdEjQaQPGyNQdkWYjxEjohgKl1YSR1GzBAFwTY4BzCOPcSwcAoByEimqJsbLiC6CZSM8KbKJA0nOPcbFJIHieBkAy94zKGBjJgPWGA9xBV-DADAIkkoAgSKiBqpFcAUVyAtQao1VKACyGBCV8rkBIQgjZZUYCUFEaAfLvXEEJaS+4UQbVMssIG3gJIYhKHqCQ8Nihwo1HdRgTWTBphfF+PmyQRFRUQCpQASWEADEFpqnXonvBZQVig5lVUaKTHefK4DiAhdkhq+jfp9t7Y-Kx7ShadJbugvpX4XLvlHmcRgjRA3jN2udaZYBZkBCqrkRZz5AnwLWUvc5iitk7JjLQOM+zDmEGOacu5lsrlBJuU098t6KFqBhSkJ5TYllfHeWyr5PzZz-MBdmIiswx7dofT9Iq761Bwr8Ioe1jq0Xas7fILgOKmKCuiASolJK+WxoTBS4gVKaV5vpZuplPwWVjLZY9Tl3KmCk35YW4VYy+XisldmwF745WowlUqlVjA1UEpmFqkFFG9X3iNSagt5rLUQGtY9DKiLkWKGdYYV1cgPVesaL6-16Ig1MuYZ2mYEa+VRoskp7ICm5AJtJMm6QqbHUZqgFmnNmBGg1sbUcNjnby2VqIjW+o1rDANoRc271bbRWdqwN2mGA7K75JnPo1gbxYtYB7MQY4Z1iSpvwLdH4sR7jlURJQEAgrYBa2NHgXkiB+RsA4CATAOA8D6hcGVoQjBmA8E6OMSYehmaQEMMFUKchxidD-H19skxP0pDKRUjm1LqzVhVCy+o02JtIjQA3IoM46BrekMyPwgrgzzoqvN+xMBpxoFS1tiwNiLtsxgIgRA7M13iWAHtp8DAuT7Z9scM7tjymXaeNdjsf3jrC3ePBkQXJAePfZtd27yIpvfRm88tQIslsrYh+ttHm37ulLsU93buNceHeO4DV2o7iBI7eDYrQL23vwtJ+D77wZycA8Zgj54cgzAEH56t-7gOtCg6+wdqHJRU1w46bTiwyO0C9fGNN4KzyzsMuILADb9OkFVU102T7uMUxTO7ECwsVYrtfbzIWbktuwczIYMyMA2BoCxC5HAcGcBmSCt0GAe3a7HedoAF7PbkBOOY9vkmSl3hOVcch+T24kMS0muQuSx6FHTrbSuVezfV49iQuCpjZidUYOo0QAgDw17ibXW2HvE-ZjjBnXgZzG-TJmbM5uqz29utIYFzJw5cgAKxCi+LQZhfwCwDin-bug1u5CT+nzOAPFVneaCgG7r4nvvf1AgH7pfqpWSbnUlyW6nzI--SlGHuPCeZxJ5+CnnI0p8AAHZB8IvT2uG7Ovuf14N-vwPEAIeS4+Ab+WA5+KSu8A41+V+Ge8uk2yuaOquTY5OAE1e+O3+QsPOTOlo8KjeniDor2OBH2Vu-Y8+tu3I9uTGEgj0G+2QzChgzIy6Uy4B0eR2W4S4u4SU2QrI7InIcgY4nBuMSylU6IkY72WAXIRIEgRw1A0wluN2ZWFWOCA8CAPAz+Y4iAi4bAGMrAQAA)

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
