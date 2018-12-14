###### [Theming Cookbook](../index.md)  >  [Layout](./index.md)

# Max Widths

The max-widths module contains both a ten-step scale based on powers of two as well as the ability to constrain element widths to a maximum of 100%.

Max widths can be combined with widths to ensure that your content doesn’t get too wide on larger monitors. Max-widths can also help keep embedded media within the canvas. As they are fluid across ranges of screen widths, max-widths are extremely useful when trying to keep a design responsive.

```css
/*

   MAX WIDTHS
   Docs: http://tachyons.io/docs/layout/max-widths/

*/

/* Max Width Percentages */

.mw-100  { max-width: 100%; }

/* Max Width Scale */

.mw1  {  max-width: 1rem; }
.mw2  {  max-width: 2rem; }
.mw3  {  max-width: 4rem; }
.mw4  {  max-width: 8rem; }
.mw5  {  max-width: 16rem; }
.mw6  {  max-width: 32rem; }
.mw7  {  max-width: 48rem; }
.mw8  {  max-width: 64rem; }
.mw9  {  max-width: 96rem; }

/* Max Width String Properties */

.mw-none { max-width: none; }

```
