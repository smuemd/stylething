###### [Theming Cookbook](../index.md)  >  [Typography](./index.md)

# MEASURE

Measure refers to the length of a line of text. It is one of the most important aspects of readability.

> “Anything from 45 to 75 characters is widely regarded as a satisfactory length of line for a single-column page… the 66-character line (counting both letters and spaces) is widely regarded as ideal. For multiple-column work, a better average is 40-50 characters.”
>
> —- Robert Bringhurst, The Elements of Typographic Style

Tachyons provides 3 classes for setting measure.

```css
/*

   TYPOGRAPHY
   http://tachyons.io/docs/typography/measure/

*/

/* Measure is limited to ~66 characters */
.measure {
  max-width: 30em;
}

/* Measure is limited to ~80 characters */
.measure-wide {
  max-width: 34em;
}

/* Measure is limited to ~45 characters */
.measure-narrow {
  max-width: 20em;
}

/* Book paragraph style - paragraphs are indented with no vertical spacing. */
.indent {
  text-indent: 1em;
  margin-top: 0;
  margin-bottom: 0;
}

.small-caps {
  font-variant: small-caps;
}

/* Combine this class with a width to truncate text (or just leave as is to truncate at width of containing element. */

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/** suit css version */
.u-textTruncate {
  max-width: 100%; /* 1 */
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  word-wrap: normal !important; /* 2 */
}

```

##### Related
- [Type Scale](type-scale.md)
- [Line Height / Leading](line-heights.md)
- [Tracking](letter-spacing.md)
- [Font Weights](font-weight.md)
- [Font Style](font-style.md)
- [Vertical Align](vertical-align.md)
- [Text Align](text-align.md)
- [Text Transform](text-transform.md)
- [Text Decoration](text-decoration.md)
- [White Space](white-space.md)
- [Font Families](font-family.md)
