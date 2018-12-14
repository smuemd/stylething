###### [Theming Cookbook](../index.md)  >  [Layout](./index.md)

# Box Sizing

The box model has been known to trip up a few people. This module should make things a bit easier.

While many people make fun of Microsoft’s ‘Internet Explorer’ browser - the one thing that most css authors agree on is that it’s the most favorable box model. Fortunately the box-sizing property is well supported now so we can fix the atrocity that is the box model that chrome, firefox, safari, and others have implemented in modern browsers.

While the * { box-sizing: border-box; } hack has become quite popular - not all elements (think form inputs) benefit from this box model. This module only applies the border-box model to certain elements as listed below. There is also a .border-box class you can apply to elements as needed.

The benefit of border-box as opposed to content-box (which is the default per the css spec) is that when you declare a width, that is the width of the element, regardless of how much border or padding you add to the element.

```css
/*
 
  BOX SIZING

*/

html,
body,
div,
article,
section,
main,
footer,
header,
form,
fieldset,
legend,
pre,
code,
a,
h1,h2,h3,h4,h5,h6,
p,
ul,
ol,
li,
dl,
dt,
dd,
textarea,
table, 
td,
th,
tr,
input[type="email"],
input[type="number"],
input[type="password"],
input[type="tel"],
input[type="text"],
input[type="url"],

.border-box {
  box-sizing: border-box;
}
```