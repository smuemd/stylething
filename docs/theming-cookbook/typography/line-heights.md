###### [Theming Cookbook](../index.md) > [Typography](./index.md)

# Line Heights

> “Many people with cognitive disabilities have trouble tracking lines of text when a block of text is single spaced. Providing spacing between 1.5 to 2 allows them to start a new line more easily once they have finished the previous one.”
>
> — WCAG 2.0 Compliance Techniques

Line-height affects how easy it is to read a piece of text, so having a well constructed set of values can help make your text easier to read, increasing the chances that people will read it. Tachyons provides classes to set text at three common line-height values. 1.5 for body copy, 1.25 for titles, and 1 for text that doesn’t wrap.

```css
/*

   LINE HEIGHT / LEADING
   Docs: http://tachyons.io/docs/typography/line-height

*/

.lh-solid { line-height: 1; }
.lh-title { line-height: 1.25; }
.lh-copy  { line-height: 1.5; }

```

##### Related
- [Type Scale](type-scale.md)
- [Measure](measure.md)
- [Tracking](letter-spacing.md)
- [Font Weights](font-weight.md)
- [Font Style](font-style.md)
- [Vertical Align](vertical-align.md)
- [Text Align](text-align.md)
- [Text Transform](text-transform.md)
- [Text Decoration](text-decoration.md)
- [White Space](white-space.md)
- [Font Families](font-family.md)