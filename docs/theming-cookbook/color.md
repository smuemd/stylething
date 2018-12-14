###### [Theming Cookbook](../index.md)  >  [Typography](./index.md)

# Color

some intro text about color

```js
// theme.js

export const colors = {
  // Grayscale Solids
  black: '#000',
  nearBlack: '#111',
  darkGray: '#333',
  midGray: '#555',
  gray: '#777',
  silver: '#999',
  lightSilver: '#aaa',
  moonGray: '#ccc',
  lightGray: '#eee',
  nearWhite: '#f4f4f4',
  white: '#fff',

  // Grayscale Transparencies
  transparent: 'transparent',  
  blacks: [
    'rgba(0,0,0,.05)',
    'rgba(0,0,0,.1)',
    'rgba(0,0,0,.2)',
    'rgba(0,0,0,.3)',
    'rgba(0,0,0,.4)',
    'rgba(0,0,0,.5)',
    'rgba(0,0,0,.6)',
    'rgba(0,0,0,.7)',
    'rgba(0,0,0,.8)',
    'rgba(0,0,0,.9)'
  ],
  whites: [
    'rgba(255,255,255,.05)',
    'rgba(255,255,255,.1)',
    'rgba(255,255,255,.2)',
    'rgba(255,255,255,.3)',
    'rgba(255,255,255,.4)',
    'rgba(255,255,255,.5)',
    'rgba(255,255,255,.6)',
    'rgba(255,255,255,.7)',
    'rgba(255,255,255,.8)',
    'rgba(255,255,255,.9)'
  ],

  // Colors
  darkRed: '#e7040f',
  red: '#ff4136',
  lightRed: '#ff725c',
  orange: '#ff6300',
  gold: '#ffb700',
  yellow: '#ffd700',
  lightYellow: '#fbf1a9',
  purple: '#5e2ca5',
  lightPurple: '#a463f2',
  darkPink: '#d5008f',
  hotPink: '#ff41b4',
  pink: '#ff80cc',
  lightPink: '#ffa3d7',
  darkGreen: '#137752',
  green: '#19a974',
  lightGreen: '#9eebcf',
  navy: '#001b44',
  darkBlue: '#00449e',
  blue: '#357edd',
  lightBlue: '#96ccff',
  lightestBlue: '#cdecff',
  washedBlue: '#f6fffe',
  washedGreen: '#e8fdf5',
  washedYellow: '#fffceb',
  washedRed: '#ffdfdf'
}

theme.colors.blacks[ '0125' ] = 'rgba(0,0,0,.0125)'
theme.colors.blacks[ '025' ] = 'rgba(0,0,0,.025)'

theme.colors.whites[ '0125' ] = 'rgba(255,255,255,.0125)'
theme.colors.whites[ '025' ] = 'rgba(255,255,255,.025)'
```

Idiomatic usage patterns:

```js
import m from 'mithril'
import b from 'bss'
import { createStyler, dfaultTheme } from 'stylething'
import { color } from 'systemthing/core'

const styled = createStyler(b, { m })
const { colors } = dfaultTheme
const whites = colors.whites
const blacks = colors.blacks


```

inspiration: Tachyons
```postcss
/*
   Tachyons
   COLOR VARIABLES
   Grayscale
   - Solids
   - Transparencies
   Colors
*/

:root {
  --black: #000;
  --near-black: #111;
  --dark-gray:#333;
  --mid-gray:#555;
  --gray: #777;
  --silver: #999;
  --light-silver: #aaa;
  --moon-gray: #ccc;
  --light-gray: #eee;
  --near-white: #f4f4f4;
  --white: #fff;
  
  --transparent:transparent;
  
  --black-90: rgba(0,0,0,.9);
  --black-80: rgba(0,0,0,.8);
  --black-70: rgba(0,0,0,.7);
  --black-60: rgba(0,0,0,.6);
  --black-50: rgba(0,0,0,.5);
  --black-40: rgba(0,0,0,.4);
  --black-30: rgba(0,0,0,.3);
  --black-20: rgba(0,0,0,.2);
  --black-10: rgba(0,0,0,.1);
  --black-05: rgba(0,0,0,.05);
  --black-025: rgba(0,0,0,.025);
  --black-0125: rgba(0,0,0,.0125);
  
  --white-90: rgba(255,255,255,.9);
  --white-80: rgba(255,255,255,.8);
  --white-70: rgba(255,255,255,.7);
  --white-60: rgba(255,255,255,.6);
  --white-50: rgba(255,255,255,.5);
  --white-40: rgba(255,255,255,.4);
  --white-30: rgba(255,255,255,.3);
  --white-20: rgba(255,255,255,.2);
  --white-10: rgba(255,255,255,.1);
  --white-05: rgba(255,255,255,.05);
  --white-025: rgba(255,255,255,.025);
  --white-0125: rgba(255,255,255,.0125);
  
  --dark-red:  #e7040f;
  --red:  #ff4136;
  --light-red:  #ff725c;
  --orange:  #ff6300;
  --gold:  #ffb700;
  --yellow:  #ffd700;
  --light-yellow:  #fbf1a9;
  --purple:  #5e2ca5;
  --light-purple:  #a463f2;
  --dark-pink:  #d5008f;
  --hot-pink: #ff41b4;
  --pink:  #ff80cc;
  --light-pink:  #ffa3d7;
  --dark-green:  #137752;
  --green:  #19a974;
  --light-green:  #9eebcf;
  --navy:  #001b44;
  --dark-blue:  #00449e;
  --blue:  #357edd;
  --light-blue:  #96ccff;
  --lightest-blue:  #cdecff;
  --washed-blue:  #f6fffe;
  --washed-green:  #e8fdf5;
  --washed-yellow:  #fffceb;
  --washed-red:  #ffdfdf;
}
```

## Skins

Tachyons comes with a collection of classes for setting the color of text and the color of the background. Listed below are the a11y friendly combinations that are available.

```css
/*
   SKINS
   Docs: http://tachyons.io/docs/themes/skins/
   Classes for setting foreground and background colors on elements.
   If you haven't declared a border color, but set border on an element, it will 
   be set to the current text color. 
*/

/* Text colors */

.black-90 {         color: var(--black-90); }
.black-80 {         color: var(--black-80); }
.black-70 {         color: var(--black-70); }
.black-60 {         color: var(--black-60); }
.black-50 {         color: var(--black-50); }
.black-40 {         color: var(--black-40); }
.black-30 {         color: var(--black-30); }
.black-20 {         color: var(--black-20); }
.black-10 {         color: var(--black-10); }
.black-05 {         color: var(--black-05); }

.white-90 {         color: var(--white-90); }
.white-80 {         color: var(--white-80); }
.white-70 {         color: var(--white-70); }
.white-60 {         color: var(--white-60); }
.white-50 {         color: var(--white-50); }
.white-40 {         color: var(--white-40); }
.white-30 {         color: var(--white-30); }
.white-20 {         color: var(--white-20); }
.white-10 {         color: var(--white-10); }

.black {         color: var(--black); }
.near-black {    color: var(--near-black); }
.dark-gray {     color: var(--dark-gray); }
.mid-gray {      color: var(--mid-gray); }
.gray {          color: var(--gray); }
.silver  {       color: var(--silver); }
.light-silver {  color: var(--light-silver); }
.moon-gray {     color: var(--moon-gray); }
.light-gray {    color: var(--light-gray); }
.near-white {    color: var(--near-white); }
.white {         color: var(--white); }

.dark-red { color: var(--dark-red); }
.red { color: var(--red); }
.light-red { color: var(--light-red); }
.orange { color: var(--orange); }
.gold { color: var(--gold); }
.yellow { color: var(--yellow); }
.light-yellow { color: var(--light-yellow); }
.purple { color: var(--purple); }
.light-purple { color: var(--light-purple); }
.dark-pink { color: var(--dark-pink); }
.hot-pink { color: var(--hot-pink); }
.pink { color: var(--pink); }
.light-pink { color: var(--light-pink); }
.dark-green { color: var(--dark-green); }
.green { color: var(--green); }
.light-green { color: var(--light-green); }
.navy { color: var(--navy); }
.dark-blue { color: var(--dark-blue); }
.blue { color: var(--blue); }
.light-blue { color: var(--light-blue); }
.lightest-blue { color: var(--lightest-blue); }
.washed-blue { color: var(--washed-blue); }
.washed-green { color: var(--washed-green); }
.washed-yellow { color: var(--washed-yellow); }
.washed-red { color: var(--washed-red); }
.color-inherit { color: inherit; }

```

## Skin Animations

You can use any color from the _colors.css file to style text and background colors for hover and focus states.

```css
/* 
  
   SKINS:PSEUDO

   Customize the color of an element when
   it is focused or hovered over.
 
 */

.hover-black:hover, 
.hover-black:focus { color: var(--black); }
.hover-near-black:hover, 
.hover-near-black:focus { color: var(--near-black); }
.hover-dark-gray:hover, 
.hover-dark-gray:focus { color: var(--dark-gray); }
.hover-mid-gray:hover, 
.hover-mid-gray:focus { color: var(--mid-gray); }
.hover-gray:hover, 
.hover-gray:focus { color: var(--gray); }
.hover-silver:hover, 
.hover-silver:focus { color: var(--silver); }
.hover-light-silver:hover, 
.hover-light-silver:focus { color: var(--light-silver); }
.hover-moon-gray:hover, 
.hover-moon-gray:focus { color: var(--moon-gray); }
.hover-light-gray:hover, 
.hover-light-gray:focus { color: var(--light-gray); }
.hover-near-white:hover, 
.hover-near-white:focus { color: var(--near-white); }
.hover-white:hover, 
.hover-white:focus { color: var(--white); }

.hover-dark-red:hover,
.hover-dark-red:focus { color: var(--dark-red); }
.hover-red:hover,
.hover-red:focus { color: var(--red); }
.hover-light-red:hover,
.hover-light-red:focus { color: var(--light-red); }
.hover-orange:hover,
.hover-orange:focus { color: var(--orange); }
.hover-gold:hover,
.hover-gold:focus { color: var(--gold); }
.hover-yellow:hover,
.hover-yellow:focus { color: var(--yellow); }
.hover-light-yellow:hover,
.hover-light-yellow:focus { color: var(--light-yellow); }
.hover-purple:hover,
.hover-purple:focus { color: var(--purple); }
.hover-light-purple:hover,
.hover-light-purple:focus { color: var(--light-purple); }
.hover-dark-pink:hover,
.hover-dark-pink:focus { color: var(--dark-pink); }
.hover-hot-pink:hover,
.hover-hot-pink:focus { color: var(--hot-pink); }
.hover-pink:hover,
.hover-pink:focus { color: var(--pink); }
.hover-light-pink:hover,
.hover-light-pink:focus { color: var(--light-pink); }
.hover-dark-green:hover,
.hover-dark-green:focus { color: var(--dark-green); }
.hover-green:hover,
.hover-green:focus { color: var(--green); }
.hover-light-green:hover,
.hover-light-green:focus { color: var(--light-green); }
.hover-navy:hover,
.hover-navy:focus { color: var(--navy); }
.hover-dark-blue:hover,
.hover-dark-blue:focus { color: var(--dark-blue); }
.hover-blue:hover,
.hover-blue:focus { color: var(--blue); }
.hover-light-blue:hover,
.hover-light-blue:focus { color: var(--light-blue); }
.hover-lightest-blue:hover,
.hover-lightest-blue:focus { color: var(--lightest-blue); }
.hover-washed-blue:hover,
.hover-washed-blue:focus { color: var(--washed-blue); }
.hover-washed-green:hover,
.hover-washed-green:focus { color: var(--washed-green); }
.hover-washed-yellow:hover,
.hover-washed-yellow:focus { color: var(--washed-yellow); }
.hover-washed-red:hover,
.hover-washed-red:focus { color: var(--washed-red); }

```
