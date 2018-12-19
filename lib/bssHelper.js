/* global window */
/**
 *
 * @param b {Function}
 * @param b.$before {Function}
 * @param b.$after {Function}
 * @param b.$media {Function}
 * @param theme
 * @return {Object}
 */
export function createBssHelpers (b, theme) {
  /* MEDIA QUERIES
     cookbook/media-queries.md */

  const breakpoints = theme.breakpoints || [ '30em', '60em' ]

  /**
   * Not-small screen
   *
   * @param style
   * @return {Object}
   */
  function notSmall (style) {
    return b.$media(`screen and (min-width: ${breakpoints[0]})`, style)
  }

  /**
   * Medium screen
   *
   * @param style
   * @return {Object}
   */
  function medium (style) {
    return b.$media(
      `screen and (min-width: ${breakpoints[0]}) and (max-width: ${breakpoints[1]})`,
      style
    )
  }

  /**
   * Large screen
   *
   * @param style
   * @return {Object}
   */
  function large (style) {
    return b.$media(`screen and (min-width: ${breakpoints[1]})`, style)
  }

  /* BORDER BOX
     cookbook/layout/box-sizing.md */

  const borderBox = b('box-sizing: border-box;')

  /* CONTAIN FLOATS (CLEARFIX)
     cookbook/layout/clearFix.md */

  /**
   * Contain floats (micro clearfix)
   *
   * Make an element expand to contain floated children.
   * Uses pseudo-elements (micro clearfix).
   *
   * 1. The space content is one way to avoid an Opera bug when the
   *    `contenteditable` attribute is included anywhere else in the document.
   *    Otherwise it causes space to appear at the top and bottom of the
   *    element.
   * 2. The use of `table` rather than `block` is only necessary if using
   *    `:before` to contain the top-margins of child elements.
   */
  const clearfix = b('*zoom: 1;')
    .$before(
      // b.content(' ').display('table')
      `content: " ";
      display: table;`
    )
    .$after(
      // b.content(' ').display('table').clear('both')
      `content: " ";
      display: table;
      clear: both;`
    )

  /* WIDTH
     cookbook/layout/widths.md */

  /**
   * width-fill
   */
  const fill = b(`
    flex: 1 1 0%;
    flex-basis: 0%;
  `)
  const fillAlt = b(`
    flex: 1 1 auto;
    flex-basis: auto;
  `)

  /**
   * width-fit
   */
  const fit = b('flex-basis: auto;')

  /**
   * width-full
   */
  const full = b('width: 100%;')

  /* FLEXBOX
     cookbook/layout/flexbox.md */

  /**
   * Container
   */
  const flexBlock = b('display: flex;')
  const flexInline = b('display: inline-flex;')

  /* Applies to flex container
     ========================================================================== */

  /**
   * Direction: row
   */
  const flexRow = b('flex-direction: row;')
  const flexRowReverse = b('flex-direction: row-reverse;')

  /**
   * Direction: column
   */
  const flexCol = b('flex-direction: column;')
  const flexColReverse = b('flex-direction: column-reverse;')

  /**
   * Wrap
   */
  const flexWrap = b('flex-wrap: wrap;')
  const flexNoWrap = b('flex-wrap: nowrap;')
  const flexWrapReverse = b('flex-wrap: wrap-reverse;')

  /**
   * Justify content
   *
   * Align items along the main axis (x-axis) of the current line of the flex container
   *
   * @param [v = 'initial'] {String} - can be 'start', 'end', 'center', 'between', 'around'
   * @return {Object}
   */
  function flexJustify (v = 'initial') {
    const map = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      between: 'space-between',
      around: 'space-around'
    }
    return b(`justify-content: ${map[v] || 'initial'};`)
  }

  /**
   * Align items
   *
   * Align items in the cross axis (y-axis) of the current line of the flex container
   * Similar to `justify-content` but in the perpendicular direction
   *
   * @param [v = 'initial'] {String}  - can be 'start', 'end', 'center', 'stretch', 'baseline'
   * @return {Object}
   */
  function flexAlignItems (v = 'initial') {
    const map = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      baseline: 'baseline'
    }
    return b(`align-items: ${map[v] || 'initial'};`)
  }

  /**
   * Align content
   *
   * Aligns rows of items within the flex container when there is extra
   * space in the cross-axis (y-axis)
   *
   * Has no effect when there is only one line / row of flex items.
   *
   * @param [v = 'initial'] {String} - can be 'start', 'end', 'center', 'stretch', 'between', 'around'
   * @return {Object}
   */
  function flexAlignContent (v = 'initial') {
    const map = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      between: 'space-between',
      around: 'space-around'
    }
    return b(`align-content: ${map[v] || 'initial'}`)
  }

  /* Applies to flex items
     ========================================================================== */

  /**
   * Align self
   *
   * Override default alignment of single item when specified by `align-items`
   *
   * @param [v = 'initial'] {String}
   * @return {Object}
   */
  function flexAlignSelf (v = 'initial') {
    const map = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      baseline: 'baseline',
      around: 'space-around',
      auto: 'auto'
    }
    return b(`align-self: ${map[v] || 'initial'}`)
  }

  /**
   * Order
   *
   * Change order without editing underlying HTML
   *
   * @param [v = 'initial'] {Number | String} - e. g. 1, -1, 999, 'first, 'last', 'none' or 0
   * @return {Object}
   */
  function flexOrder (v = 'initial') {
    const n = parseInt(v, 10)
    const map = {
      first: -1,
      last: 1,
      none: 0
    }
    return b(`order: ${isNaN(n) ? map[v] || 'initial' : n};`)
  }

  /**
   * Grow
   *
   * Specify the flex grow factor, which determines how much the flex item will
   * grow relative to the rest of the flex items in the flex container.
   *
   * Supports Number or Sring (global values) proportions
   *
   * 1. Provide all values to avoid IE10 bug with shorthand flex
   *    - http://git.io/vllC7
   *
   *    Use `0%` to avoid bug in IE10/11 with unitless flex basis. Using this
   *    instead of `auto` as this matches what the default would be with `flex`
   *    shorthand - http://git.io/vllWx
   *
   * @param v
   * @return {Object}
   */
  function flexGrow (v) {
    const n = parseInt(v, 10)
    return b(`flex: ${isNaN(n) ? '0 1 0%' : n + ' 1 0%'};`) /* 1 */
  }

  /**
   * Shrink
   *
   * Specify the flex shrink factor, which determines how much the flex item will
   * shrink relative to the rest of the flex items in the flex container.
   *
   * @param v
   * @return {Object}
   */
  function flexShrink (v = 'initial') {
    const n = parseInt(v, 10)
    return b(`flex-shrink: ${isNaN(n) ? 'initial' : n};`)
  }
  /**
   * Expand
   *
   * Aligning with `auto` margins
   * http://www.w3.org/TR/css-flexbox-1/#auto-margins
   *
   * valid params are 'initial', 'auto', 'top', 'right', 'bottom', 'left'
   *
   * @param [v = 'initial']
   * @return {Object}
   */
  function flexExpand (v) {
    if (![ 'auto', 'top', 'right', 'bottom', 'left' ].find(i => i === v)) return b('margin: initial;')
    else return b((v !== 'auto') ? `margin-${v}: auto;` : 'margin: auto;')
  }

  /**
   * Basis
   *
   * sets the initial main size of a flex item.
   * It sets the size of the content box unless otherwise set with box-sizing.
   *
   * @param [v = 'initial'] {String | Number} -
   * @return {Object}
   */
  function flexBasis (v = 'initial') {
    return b('flex-basis: ' + v + ';')
  }

  /*
   * SHORTHAND
   *
   * Declares all values instead of keywords like 'initial' to work around IE10
   * https://www.w3.org/TR/css-flexbox-1/#flex-common
   *
   * 1. Fixes issue in IE 10 where flex-basis is ignored - https://git.io/vllMt
   *    This ensures it overrides flex-basis set in other utilities.
   */

  /**
   * Sizes the item based on the width/height properties
   */
  const flexInitial = b(`
    flex: 0 1 auto;
    flex-basis: auto; /* 1 */
  `)

  /**
   * Sizes the item based on the width/height properties, but makes them fully
   * flexible, so that they absorb any free space along the main axis.
   */
  const flexAuto = b(`
    flex: 1 1 auto;
    flex-basis: auto;  /* 1 */
  `)

  /**
   * Sizes the item according to the width/height properties, but makes the flex
   * item fully inflexible. Similar to initial, except that flex items are
   * not allowed to shrink, even in overflow situations.
   */
  const flexNone = b(`
    flex: 0 0 auto;
    flex-basis: auto; /* 1 */
  `)

  /* VERTICAL ALIGN
     cookbook/typography/vertical-align.md */

  /**
   * Align
   *
   * Sets vertical alignment of an inline or table-cell box.
   *
   * @param [v = 'initial'] {String} - 'baseline' | 'sub' | 'super' | 'text-top' | 'text-bottom' | 'middle' | 'top' | 'bottom' | <percentage> | <length>
   * @return {Object}
   */
  function align (v = 'initial') {
    return b(`vertical-align: ${v};`)
  }

  /* DISPLAY
     cookbook/layout/display.md */

  /**
   * block
   *
   * display: block
   */
  const block = b('display: block;')

  /**
   * hidden
   *
   * display: none
   */
  const hidden = b('display: none;')

  /**
   * hiddenVisually
   *
   * Completely remove from the flow but leave available to screen readers.
   */
  const hiddenVisually = b(`
    border: 0px;
    clip: rect(1px,1px,1px,1px);
    height: 1px;
    overflow: hidden;
    padding: 0px;
    position: absolute;
    width: 1px`)
  // .border('0')
  // .clip('rect(1px,1px,1px,1px)')
  // .height('1px')
  // .overflow('hidden')
  // .padding('0')
  // .position('absolute')
  // .width('1px')

  /**
   * inline
   *
   * display: inline
   */
  const inline = b('display: inline;')

  /**
   * inlineBlock
   *
   * display: inline-block
   *
   * 1. Fix for Firefox bug: an image styled `max-width:100%` within an
   * inline-block will display at its default size, and not limit its width to
   * 100% of an ancestral container.
   */
  const inlineBlock = b(`
    display: inline-block;
    max-width: 100%;`)
  // .display('inline-block')
  // .maxWidth('100%') // 1

  /**
   * table
   */
  const table = b('display: table;')

  /**
   * table-row
   */
  const tableRow = b('display: table-row;')

  /**
   * table-row-group
   */
  const tableRowGroup = b('display: table-row-group;')

  /**
   * table-cell
   */
  const tableCell = b('display: table-cell;')

  /**
   * table-column
   */
  const tableColumn = b('display: table-column;')

  /**
   * table-column-group
   */
  const tableColumnGroup = b('display: table-column-group;')

  return {
    // media queries
    '$notSmall': notSmall,
    '$medium': medium,
    '$large': large,

    borderBox,

    // contain floats
    clearfix,
    cf: clearfix,

    // width
    fill,
    fillAlt,
    fit,
    full,

    // flexbox
    flexBlock,
    flexInline,
    flexRow,
    flexRowReverse,
    flexCol,
    flexColReverse,
    flexWrap,
    flexNoWrap,
    flexWrapReverse,
    flexJustify,
    flexAlignItems,
    flexAlignContent,

    flexAlignSelf,
    flexOrder,
    flexGrow,
    flexShrink,
    flexExpand,
    flexBasis,

    flexInitial,
    flexAuto,
    flexNone,

    // vertical-align
    align,

    // display
    block,
    hidden,
    hiddenVisually,
    inline,
    inlineBlock,
    table,
    tableRow,
    tableRowGroup,
    tableCell,
    tableColumn,
    tableColumnGroup
  }
}
