###### [Theming Cookbook](../index.md)  >  [Typography](./index.md)

# Background Size

Background-size affects how background images fill their containing elements. While measurements can be declared explicitly to size an image, the values that seem most reusable are contain and cover.

```css
/*

   BACKGROUND SIZE
   Docs: http://tachyons.io/docs/themes/background-size/

   Often used in combination with background image set as an inline style
   on an html element.

*/

.cover { background-size: cover!important; }
.contain { background-size: contain!important; }
```