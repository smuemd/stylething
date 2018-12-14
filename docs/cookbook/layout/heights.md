###### [Theming Cookbook](../index.md)  >  [Layout](./index.md)

# Heights

The heights module contains both a five-step height scale based on powers of two as well as a series of percentage values. Explicit values can be used inside of any parent. Percentage values will only work inside of a parent element that has a declared height.

```css
/*

   HEIGHTS
   Docs: http://tachyons.io/docs/layout/heights/

*/

/* Height Scale */

.h1 { height: 1rem; }
.h2 { height: 2rem; }
.h3 { height: 4rem; }
.h4 { height: 8rem; }
.h5 { height: 16rem; }

/* Height Percentages - Based off of height of parent */

.h-25 {  height:  25%; }
.h-50 {  height:  50%; }
.h-75 {  height:  75%; }
.h-100 { height: 100%; }

.min-h-100 { min-height: 100%; }

/* Screen Height Percentage */

.vh-25 {  height:  25vh; }
.vh-50 {  height:  50vh; }
.vh-75 {  height:  75vh; }
.vh-100 { height: 100vh; }

.min-vh-100 { min-height: 100vh; }


/* String Properties */

.h-auto {     height: auto; }
.h-inherit {  height: inherit; }
```