###### [Theming Cookbook](../index.md)  >  [Layout](./index.md)

# Clear Fix

When floats are used for layouts - they need a clearfix solution. This helps prevent layout problems caused by the elements being removed from the block context of the surrounding elements.

```css
/*

   CLEARS

*/

/* Nicolas Gallaghers Clearfix solution
   Ref: http://nicolasgallagher.com/micro-clearfix-hack/ */

.cf:before,
.cf:after   { content: " "; display: table; }
.cf:after   { clear: both; }
.cf         { *zoom: 1; }

```
