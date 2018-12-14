###### [Theming Cookbook](../index.md)  >  [Layout](./index.md)

# FLOATS

Single purpose classes for setting the display of an element at any breakpoint.

Floats may be set on any element, but it will only affect elements that aren’t absolutely positioned. When you float an element you inherently set its display to block.

There are only three values that can be declared for float: left, right, or none. These three base classes are very easy to memorize: fl, fr, fn. Combine float left/right with width utilities to create fluid multi-column layouts.

```css
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

```
