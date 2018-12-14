###### [Theming Cookbook](../index.md)  >  [Typography](./index.md)

# Hover Effects

There are several classes for adding hover effects to elements. Hover effects can be used to give visual affordance to the user that an element can be interacted with.

- [Dim](#dim)
- [Glow](#glow)
- [Hide Child](#hide-child)
- [Underline text](#underline-text)
- [Grow](#grow)
- [Pointer](#pointer)
- [Shadow](#shadow)
- [Animate background color](#animate-background-color)

## Dim

Dim element on hover by adding the dim class.

- Set up `BSS` helper

```js
import m from 'mithril' // view layer
import b from 'bss'
import { dfaultTheme, createStyler } from 'stylething'

const { colors } = dfaultTheme
const styled = createStyler(b, { m })

const _onDim = `
  opacity: 1;
  transition: opacity .15s ease-in;
`
const _onDimHover = `
  opacity: .5;
  transition: opacity .15s ease-in;
`

const _onDimActive = `
  opacity: .8;
  transition: opacity .15s ease-out;
`

b.helper('dim', b(_onDim)
  .$hover(_onDimHover)
  .$focus(_onDimHover)
  .$active(_onDimActive)
)

const Box = styled('div', b.bc('red').dim)
```

<!-- Inspiration tachyons
```postcss
/*

  Dim element on hover by adding the dim class.

*/

.dim {
  opacity: 1;
  transition: opacity .15s ease-in;
}
.dim:hover,
.dim:focus {
  opacity: .5;
  transition: opacity .15s ease-in;
}
.dim:active {
  opacity: .8; transition: opacity .15s ease-out;
}
```
-->

## Glow

Animate opacity to 100% on hover by adding the glow class.

- Set up `BSS` helper

```js
import m from 'mithril' // view layer
import b from 'bss'
import { dfaultTheme, createStyler } from 'stylething'

const { colors } = dfaultTheme
const styled = createStyler(b, { m })

const _onGlowHover = `
  opacity: 1;
  transition: opacity .15s ease-in;
`

b.helper('glow', b('transition: opacity .15s ease-in;')
  .$hover(_onGlowHover)
  .$focus(_onGlowHover)
)

const Box = styled('div', b.bc('red').glow)
```
<!-- Inspiration tachyons
```postcss
/*

  Animate opacity to 100% on hover by adding the glow class.
  Docs: http://tachyons.io/docs/themes/hovers/

*/
.glow {
  transition: opacity .15s ease-in;
}
.glow:hover,
.glow:focus {
  opacity: 1;
  transition: opacity .15s ease-in;
}
```
-->

## Hide Child

Put the hide-child class on a parent element and any nested element with the
  child class will be hidden and displayed on hover or focus.

- Set up `BSS` helper
```js
import m from 'mithril' // view layer
import b from 'bss'
import { dfaultTheme, createStyler } from 'stylething'

const { colors } = dfaultTheme
const styled = createStyler(b, { m })

const _onChild = `
  opacity: 0;
  transition: opacity .15s ease-in;`
const _onChildHover = `
  opacity: 1;
  transition: opacity .15s ease-in;
`
b.helper('hideChild', b.$nest('.child', b(_onChild))
  .$nest(':hover .child', b(_onChildHover))
  .$nest(':focus .child', b(_onChildHover))
  .$nest(':active .child', b(_onChildHover))
)

const Box = styled('div' + b('color: ' + colors.darkGray).hideChild)

const WithChild = m(Box, [
  m('div', [
    m('h1.child', 'Hello'), // only .child will be affected!
    m('p', 'World')
  ])
])
```

<!-- Tachyons inspiration
```css
/*

  Hide child & reveal on hover:

  Put the hide-child class on a parent element and any nested element with the
  child class will be hidden and displayed on hover or focus.

*/

.hide-child .child {
  opacity: 0;
  transition: opacity .15s ease-in;
}
.hide-child:hover  .child,
.hide-child:focus  .child,
.hide-child:active .child {
  opacity: 1;
  transition: opacity .15s ease-in;
}
```
-->

## Underline text

- BSS helper
```js
import m from 'mithril' // view layer
import b from 'bss'
import { dfaultTheme, createStyler } from 'stylething'

const { colors } = dfaultTheme
const styled = createStyler(b, { m })

const _underline = 'text-decoration: underline;'
b.helper('hoverUnderline', b.$hover(_underline).$focus(_underline))

const Link = styled('a', b.hoverUnderline)

const A = m(Link, { href: '/whatever'}, 'Will underline on hover')
```

<!-- Tachyons inspiration
```css
.underline-hover:hover,
.underline-hover:focus {
  text-decoration: underline;
}
```-->

## Grow

Grow can be combined this with overflow-hidden to make background images grow on hover even if you are using background-size: cover

- BSS helper
```js
import m from 'mithril' // view layer
import b from 'bss'
import { dfaultTheme, createStyler } from 'stylething'

const { colors } = dfaultTheme
const styled = createStyler(b, { m })

const _growBase = `
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;`
const _grow = 'transform: scale(1.05);'
const _growLarge = 'transform: scale(1.2);'

b.helper({
  grow: b(_growBase)
    .$hover(_grow)
    .$focus(_grow)
    .$active('transform: scale(.90)'),
  
  growLarge: b(_growBase)
    .$hover(_growLarge)
    .$focus(_growLarge)
    .$active('transform: scale(.95)')
})

const GrowBox = styled('div' + b.growLarge)

const A = m(GrowBox, { bc: 'pink', padding: '2em' }, 'Will grow large on hover')
```
<!-- Tachyons inspiration
```css
/* Can combine this with overflow-hidden to make background images grow on hover
 * even if you are using background-size: cover */
 
.grow {
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;
}

.grow:hover,
.grow:focus {
  transform: scale(1.05);
}

.grow:active {
  transform: scale(.90);
}

.grow-large {
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform .25s ease-in-out;
}

.grow-large:hover,
.grow-large:focus {
  transform: scale(1.2);
}

.grow-large:active {
  transform: scale(.95);
}
``` -->

## Pointer

- BSS helper

```js
import m from 'mithril' // view layer
import b from 'bss'
import { dfaultTheme, createStyler } from 'stylething'

const styled = createStyler(b, { m })

b.helper('pointer', b('cursor: pointer;'))

const Link = styled('span', b('color blue').pointer)

const A = m(Link, 'with show pointer')
```

<!-- Tachyons inspiration
```css
/* Add pointer on hover */

.pointer:hover {
  cursor: pointer;
}
``` -->

## Shadow

Performant box-shadow animation pattern from
http://tobiasahlin.com/blog/how-to-animate-box-shadow/

- BSS helper

```js
import m from 'mithril' // view layer
import b from 'bss'
import { dfaultTheme, createStyler } from 'stylething'

const styled = createStyler(b, { m })

const _shadowBase = `
  cursor: pointer;
  position: relative;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);`
const _shadowAfterBase = `
  content: "";
  box-shadow: 0px 0px 16px 2px rgba(0, 0, 0, .2); // box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3)
  border-radius: inherit;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: opacity 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);`
const _onHoverAfter = 'opacity: 1;'

b.helper('hoverShadow', b(_shadowBase)
  .$after(_shadowAfterBase)
  .$hover(b.$after(_onHoverAfter)))

const Blue = styled('div', b({
  width: 100,
  height: 100,
  bc: colors.lightBlue }).hoverShadow)

const A = m(Blue, 'Shadowy on hover')
```
<!-- tachyons inspiration
```css
/* 
   Add shadow on hover.

   Performant box-shadow animation pattern from 
   http://tobiasahlin.com/blog/how-to-animate-box-shadow/ 
*/

.shadow-hover {
  cursor: pointer;
  position: relative;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.shadow-hover::after {
  content: '';
  box-shadow: 0px 0px 16px 2px rgba(0, 0, 0, .2);
  border-radius: inherit;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: opacity 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.shadow-hover:hover::after,
.shadow-hover:focus::after {
  opacity: 1;
}
``` -->

## Animate Background Color

Combine with classes in skins and skins-pseudo for many different transition possibilities.
 
- BSS helper

```js
import m from 'mithril' // view layer
import b from 'bss'
import { dfaultTheme, createStyler } from 'stylething'

const styled = createStyler(b, { m })

const _onAnimateBg = 'background-color .15s ease-in-out'
b.helper('animateBg', b.transition(_onAnimateBg)
  .$hover(_onAnimateBg)
  .$focus(_onAnimateBg))
```
<!-- tachyons inspiration
```css
/* Combine with classes in skins and skins-pseudo for 
 * many different transition possibilities. */

.bg-animate,
.bg-animate:hover,
.bg-animate:focus {
  transition: background-color .15s ease-in-out; 
}
```-->