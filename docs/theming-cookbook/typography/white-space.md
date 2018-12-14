###### [Theming Cookbook](../index.md)  >  [Typography](./index.md)

# White Space

White space in css is used to control how whitespace is rendered. Creative, I know.

- **Normal** supresses white space characters and breaks lines based on the width of the element or the placement of a br tag.
- **Nowrap** will keep all text on one line - often used in conjunction with truncation or a scrollbar. This can be useful for displaying unix style commands where indicating everything is on one line is important for clarity.
- **Pre** will preserve all whitespace and linebreaks. This is useful for displaying code or poetry. Simulates the rendering of the pre tag.

```css
/*

   WHITE SPACE

*/


.ws-normal { white-space: normal; }
.nowrap { white-space: nowrap; }
.pre { white-space: pre; }

```

##### Related
- [Type Scale](type-scale.md)
- [Measure](measure.md)
- [Line Height / Leading](line-heights.md)
- [Tracking](letter-spacing.md)
- [Font Weights](font-weight.md)
- [Font Style](font-style.md)
- [Vertical Align](vertical-align.md)
- [Text Align](text-align.md)
- [Text Transform](text-transform.md)
- [Text Decoration](text-decoration.md)
- [Font Families](font-family.md)