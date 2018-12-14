###### [Theming Cookbook](../index.md)  >  [Layout](./index.md)

# Position

Html elements are initially set to a position of 'static'. Tachyons provides classes for setting position to be relative or absolute.

Absolute elements are absolutely positioned inside of a relative element. You can use absolute positioning to stretch elements making sure they fill the width and height of a relative container. Relatively positioned elements offer the ability to offset the position of an element without affecting the position of any elements around it. This module should be used in conjunction with the coordinates module which is used to give working examples on this page.

```css
/*

   POSITIONING
   Docs: http://tachyons.io/docs/layout/position/

*/

.static { position: static; }
.relative  { position: relative; }
.absolute  { position: absolute; }
.fixed  { position: fixed; }

```

```css
/*

   COORDINATES

   Use in combination with the position module.

*/

.absolute--fill {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.top-0    { top:    0; }
.right-0  { right:  0; }
.bottom-0 { bottom: 0; }
.left-0   { left:   0; }

.top-1    { top:    1rem; }
.right-1  { right:  1rem; }
.bottom-1 { bottom: 1rem; }
.left-1   { left:   1rem; }

.top-2    { top:    2rem; }
.right-2  { right:  2rem; }
.bottom-2 { bottom: 2rem; }
.left-2   { left:   2rem; }

.top--1    { top:    -1rem; }
.right--1  { right:  -1rem; }
.bottom--1 { bottom: -1rem; }
.left--1   { left:   -1rem; }

.top--2    { top:    -2rem; }
.right--2  { right:  -2rem; }
.bottom--2 { bottom: -2rem; }
.left--2   { left:   -2rem; }

```
