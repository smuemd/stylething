###### [Theming Cookbook](../index.md)  >  [Typography](./index.md)

# Font Family

There are several pre-defined classes for setting the typeface of a page or element. It is suggested that you customize or extend this module to suit your own needs. As tachyons is a toolkit for designing performant webpages it comes with a variety of font stacks that utilize attractive system fonts with appropriate fallbacks.

Relying on systems fonts greatly improves page performance and can also help your web application/site blend in with the user’s operating system. Readability is strongly linked to familiarity, so this helps create a more fluid reading experience, allowing your users to focus on your content.

```css
/*

   FONT FAMILY GROUPS
   Docs: http://tachyons.io/docs/typography/font-family/

*/


.sans-serif {
  font-family: -apple-system, BlinkMacSystemFont,
               'avenir next', avenir,
               'helvetica neue', helvetica,
               ubuntu,
               roboto, noto,
               'segoe ui', arial,
               sans-serif;
}

.serif {
  font-family: georgia,
               times,
               serif;
}

.system-sans-serif {
  font-family: sans-serif;
}

.system-serif {
  font-family: serif;
}


/* Monospaced Typefaces (for code) */

/* From http://cssfontstack.com */
code, .code {
  font-family: Consolas,
               monaco,
               monospace;
}

.courier {
  font-family: 'Courier Next',
               courier,
               monospace;
}


/* Sans-Serif Typefaces */

.helvetica {
  font-family: 'helvetica neue', helvetica,
               sans-serif;
}

.avenir {
  font-family: 'avenir next', avenir,
               sans-serif;
}


/* Serif Typefaces */

.athelas {
  font-family: athelas,
               georgia,
               serif;
}

.georgia {
  font-family: georgia,
               serif;
}

.times {
  font-family: times,
               serif;
}

.bodoni {
  font-family: "Bodoni MT",
                serif;
}

.calisto {
  font-family: "Calisto MT",
                serif;
}

.garamond {
  font-family: garamond,
               serif;
}

.baskerville {
  font-family: baskerville,
               serif;
}

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
- [White Space](white-space.md)
