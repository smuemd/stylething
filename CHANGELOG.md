
# Changelog

## v3.8 [unpublished]

### Changed

update bss helpers
 - rename textUpperCase to textUppercase (breaking)
 - rename textLowerCase to textLowercase (breaking)
 - rename flexWrap helper to flexDoWrap to fix name collision with native `flex-wrap` css prop (breaking)
 
Makes invoking helpers in template literals a bit nicer in some situations.

```js
let upper = b`
  font-size: 1.5rem;
  text-uppercase;` // instead of 'text-upper-case'
```
 

## v2.7 10.02.2019

### Added

new bss helpers
  - bgCover
  - bgContian
  - setBorder,
  - setBorderStyle,
  - setBorderColor,
  - setBorderWidth,
  - setBorderRadius,
  - link,
  - hoverDim,
  - hoverGlow,
  - hideChild,
  - hoverUnderline,
  - hoverGrow,
  - hoverGrowLarge,
  - hoverPointer,
  - hoverShadow fn,
  - bgAnimate,
  - hoverBg fn,
  - hoverColer fn,
  - size (w, h)
  - fill,
  - fillAlt,
  - fit,
  - full,
  - textBreak,
  - textCenter,
  - textLeft,
  - textRight,
  - textJustify,
  - textKern,
  - textNoWrap,
  - textMeasure,
  - textMeasureWide,
  - textMeasureNarrow,
  - textIndent,
  - textTruncate,
  - textStrikethrough,
  - textUnderline,
  - textNoUnderline,
  - textNoTransform,
  - textCaps,
  - textLowerCase,
  - textUpperCase,
  - textTitlingCaps,
  - textSmallCaps,
  - textSmallCapsAll,
  - textTracked,
  - textTrackedTight,
  - textTrackedMega,
  - lineHightSolid,
  - lineHeightTitle,
  - lineHeightCopy,
  - reset ('input' || 'button' || 'list'),
  - center,
  - collapse,
  - striped
  
  
### Changed

refactor bssHelpers
 - define stiles outside of createBssHelpers functions
 
lib/theme
  - add shadows array
  - add opacities map

docs/cookbook
 - WIP updates
 
## v2.6 2018-12-23

Very breaking. Removes legacy exports of `createStyler`, `theme` and `createBssHelpers` from `lib/index.js`

These are the idiomatic ways to import Stylething utilities in v2.6:

```js
import { createComponentFactory } from 'stylething'
import { createBssHelpers } from 'stylething/bssHelpers.esm'
import * as theme from 'stylething/theme.esm'
```

### Changed

**`lib/index.js` (BREAKING)**
- rm legacy `createStyler` named export
- rm legacy `createBssHelpers` named export
- rm legacy `theme` named export

**`lib/styler.js` (BREAKING)**
- rm legacy `createStyler` named export

**`lib/bssHelpers.js`**
- bypass bss sanitizing for optimal perf (see https://github.com/porsager/bss/issues/42)
- fix `flexExpand` fn

## v1.5 2018-12-21

Add additional option to the ways in which `theme` and `bssHelpers` are exposed and consumed:

previously `theme` and `createBssHelpers` could be accessed directly from the Stylething main module
```js
// old
import { theme, createBssHelpers } from 'stylething'
```

in v1.5 `theme` and `createBssHelpers` live in their own module each

```js
// new
import * as theme from 'stylething/theme'
import { createBssHelpers } from 'stylething/bssHelpers'
```

### Added

**in `lib/helpers.js`**
- new helpers `b.nbfc` & `b.nbfcAlt` - Create new block formarting context

### Changed

**`lib/theme.js`** 
- removes default export, adds named exports - BREAKING, internally -

**`lib/bssHelpers.js`**
- renamed lib/bssHelper.js to lib/bssHelpers.js
- fix an exception thrown when no `theme` was provided as an argument

**`rollup.config.js`**
- compile `stylething`, `theme`,`bssHelpers` as separate files / packages

## v1.4 2018-12-19

- add bss Helper factory
- refactor `createStyler` function to `createComponentFactory`
    - `createStyler` named export still available for backwards compatibility
- expose `theme` and `createBssHelpers` factory in the main module
- fix bug in `package.json` `main` field
    - depreciates v1.2 and v1.3

**add available helpers**

- `b.$notSmall(style)` - media query from `30em` and up
- `b.$medium(style)` -  media querybetween `30em` and `60em`
- `b.$large(style)` -  media query more than `60em`
- `b.align(v)` - align inline-level elements vertically (along the y-axis).
- `b.clearfix` alias `b.cf` - Contain floats (micro clearfix).
- `b.block` - Display `block`.
- `b.hidden` - Display `none`.
- `b.hiddenVisually` - Visually hidden but available to screenreaders.
- `b.inline` - Display `inline`.
- `b.inlineBlock` - Display `inline-block`.
- `b.table` - Display `table`.
- `b.tableCell` - Display `table-cell`.
- `b.tableRow` - Display `table-row`.
- `b.tableRowGroup` - Display `table-row-group`.
- `b.tableColumn` - Display `table-column`.
- `b.tableColumnGroup` - Display `table-column-group`.
- `b.flexBlock` - Display `flex`.
- `b.flexInline` - Display `inline-flex`.
- `b.flexRow` - Displays items in a row
- `b.flexRowReverse` - Reverses items in a row
- `b.flexCol` - Display items in a column
- `b.flexColReverse` - Reverses items in a column
- `b.flexWrap` - Wrap items onto another line when space allows
- `b.flexNoWrap` - Force items to stay on one line
- `b.flexWrapReverse` - Wrap items and reverse direction
- `b.flexJustify(v)` - Align items along the main axis (x-axis) of the current line of the flex container
- `b.flexAlignItems(v)` - Align items in the cross axis (y-axis) of the current line of the flex container
- `b.flexAlignContent(v)` - Aligns rows of items within the flex container when there is extra space in the cross-axis (y-axis)
- `b.flexAlignSelf(v)` - Override default alignment of single item when specified by `align-items`
- `b.flexOrder(v)` - Specify how much the flex item will grow relatively
- `b.flexGrow(n)` - Specify how much the flex item will grow relatively
- `b.flexShrink(n)` - Specify how much the flex item will shrink relatively
- `b.flexBasis(v)` - set the size of the content box
- `b.flexInitial` - Sizes the item based on the width/height properties
- `b.flexAuto` - Sizes the item based on the width/height properties, but makes them fully flexible, so that they absorb any free space along the main axis.
- `b.flexNone` - Sizes the item according to the width/height properties, but
  makes the flex item fully inflexible. Similar to initial, except that flex
  items are not allowed to shrink, even in overflow situations.
- `b.flexExpand(value)` - apply auto margins to the direction provided as `value`
- `b.fit` - Make an element shrink wrap its content with `flex-basis`.
- `b.full` - Make an element the width of its parent.
- `b.fill` - Make an element fill the remaining space. Distribute space evenly on multiple elements.
- `b.fillAlt` - An alternative method to make an element fill the remaining space. Distribute space based on element width.

**add theme properties**

- `breakpoints` at `30em` and `60em`
- `fontSizes` at `.75rem`, `.875rem`, `1rem`, `1.25rem`, `1.5rem`, `2.25rem`, `3rem`, `5rem`, `6rem`
- `fontSizes.subheadline` at `5rem`
- `fontSizes.headline` at `6rem`
- `radii` at `0`, `.125rem`, `.25rem`, `.5rem`', `1rem`
- `radii.pill` at `9999px`
-  `radii.max` at `100%`
- **`colors`**
  - `black`
  - `nearBlack`
  - `darkGray`
  - `midGray`
  - `gray`
  - `silver`
  - `lightSilver`
  - `moonGray`
  - `lightGray`
  - `nearWhite`
  - `white`
  - `transparent`
  - `black90`
  - `black80`
  - `black70`
  - `black60`
  - `black50`
  - `black40`
  - `black30`
  - `black20`
  - `black10`
  - `black05`
  - `black025`
  - `black0125`
  - `white90`
  - `white80`
  - `white70`
  - `white60`
  - `white50`
  - `white40`
  - `white30`
  - `white20`
  - `white10`
  - `white05`
  - `white025`
  - `white0125`
  - `darkRed`
  - `red`
  - `lightRed`
  - `orange`
  - `gold`
  - `yellow`
  - `lightYellow`
  - `purple`
  - `lightPurple`
  - `darkPink`
  - `hotPink`
  - `pink`
  - `lightPink`
  - `darkGreen`
  - `green`
  - `lightGreen`
  - `navy`
  - `darkBlue`
  - `blue`
  - `lightBlue`
  - `lightestBlue`
  - `washedBlue`
  - `washedGreen`
  - `washedYellow`
  - `washedRed`

## v1.3 2018-12-11

- add [preact](https://preactjs.com) support
- add default theme
- minor non-breaking internal changes in lib/styler.js

## v1.2 2018-12-10

- fix bug in json `main` field
- depreciates v1.1

## v1.1 2018-12-10

- Initial release 
<!--
### Added

- Bullet

### Changed

- Bullet

### Removed

- Bullet
-->
