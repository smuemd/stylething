###### [Theming Cookbook](../index.md)  >  [Layout](./index.md)

# Display

Single purpose classes for setting the display of an element at any breakpoint.

>The display property defines box’s display type, which consists of the two basic qualities of how an element generates boxes: the inner display type, which defines the kind of formatting context it generates, dictating how its descendant boxes are laid out. the outer display type, which dictates how the box participates in its parent formatting context.
>
> — css3 Display Module Spec

```css
/*

   DISPLAY
   Docs: http://tachyons.io/docs/layout/display

*/

.dn {              display: none; }
.di {              display: inline; }
.db {              display: block; }
.dib {             display: inline-block; }
.dit {             display: inline-table; }
.dt {              display: table; }
.dtc {             display: table-cell; }
.dt-row {          display: table-row; }
.dt-row-group {    display: table-row-group; }
.dt-column {       display: table-column; }
.dt-column-group { display: table-column-group; }

/*
  This will set table to full width and then
  all cells will be equal width
*/
.dt--fixed {
  table-layout: fixed;
  width: 100%;
}

```
