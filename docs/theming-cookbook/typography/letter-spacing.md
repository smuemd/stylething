###### [Theming Cookbook](../index.md)  >  [Typography](./index.md)


# Letter Spacing

Letter-spacing is the consistent white-space between letters in a piece of text. In typography, letter-spacing is commonly known as tracking. Text that is set to uppercase should be tracked to improve readability.

Lowercase text should never be tracked.
For some larger text, depending on the typeface, a negative tracking might be desirable.

There are three possible values to choose from when tracking uppercased text:

```css
/*

   LETTER SPACING
   Docs: http://tachyons.io/docs/typography/tracking/

*/

.tracked       { letter-spacing:  .1em; }
.tracked-tight { letter-spacing: -.05em; }
.tracked-mega  { letter-spacing:  .25em; }

```

##### Related
- [Type Scale](type-scale.md)
- [Measure](measure.md)
- [Line Height / Leading](line-heights.md)
- [Font Weights](font-weight.md)
- [Font Style](font-style.md)
- [Vertical Align](vertical-align.md)
- [Text Align](text-align.md)
- [Text Transform](text-transform.md)
- [Text Decoration](text-decoration.md)
- [White Space](white-space.md)
- [Font Families](font-family.md)
