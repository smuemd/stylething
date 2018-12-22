/**
 *
 * @param b {Function}
 * @param [theme = {}] {Object}
 * @return {Object}
 */
export function createBssHelpers (b, theme = {}) {
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
    return b({
      __style: { [ '@media screen and (min-width: ' + breakpoints[0] + ')' ]: b(style).__style }
    })
  }

  /**
   * Medium screen
   *
   * @param style
   * @return {Object}
   */
  function medium (style) {
    return b({
      __style: {
        [ '@media screen and (min-width: ' + breakpoints[0] + ') and (max-width: ' + breakpoints[1] + ')' ]:
          b(style).__style
      }
    })
  }

  /**
   * Large screen
   *
   * @param style
   * @return {Object}
   */
  function large (style) {
    return b({
      __style: { [ '@media screen and (min-width: ' + breakpoints[1] + ')' ]: b(style).__style }
    })
  }

  /* BORDER BOX
     cookbook/layout/box-sizing.md */

  const borderBox = b({
    __style: { boxSizing: 'border-box' } // b('box-sizing: border-box;')
  })

  /* FLOATS
     cookbook/layout/clearFix.md
     cookbook/layout/floats.md */

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

  const clearfix = b({
    __style: {
      '::before': { content: '" "', display: 'table' },
      '::after': { content: '" "', display: 'table', clear: 'both' }
    }
  })

  /**
   * New block formatting context
   *
   * This affords some useful properties to the element. It won't wrap under
   * floats. Will also contain any floated children.
   * N.B. This will clip overflow. Use the alternative method below if this is
   * problematic.
   */
  const nbfc = b({ __style: { overflow: 'hidden' } })

  /**
   * New block formatting context (alternative)
   *
   * Alternative method when overflow must not be clipped.
   *
   * 1. Create a new block formatting context.
   * 2. Avoid shrink-wrap behaviour of table-cell.
   *
   * N.B. This breaks down in some browsers when elements within this element
   * exceed its width.
   */
  const nbfcAlt = b({
    __style: {
      display: 'table-cell', /* 1 */
      width: '10000px' /* 2 */
    }
  })

  /* WIDTH
     cookbook/layout/widths.md */

  /**
   * width-fill
   */
  const fill = b({
    __style: {
      flex: '1 1 0%',
      flexBasis: '0%'
    }
  })

  const fillAlt = b({
    __style: {
      flex: '1 1 auto',
      flexBasis: 'auto'
    }
  })

  /**
   * width-fit
   */
  const fit = b({ __style: { flexBasis: 'auto' } })

  /**
   * width-full
   */
  const full = b({ __style: { width: '100%' } })

  /* DISPLAY
     cookbook/layout/display.md */

  /**
   * block
   *
   * display: block
   */
  const block = b({ __style: { display: 'block' } }) // b('display: block;')

  /**
   * hidden
   *
   * display: none
   */
  const hidden = b({ __style: { display: 'none' } }) // b('display: none;')

  /**
   * hiddenVisually
   *
   * Completely remove from the flow but leave available to screen readers.
   */
  const hiddenVisually = b({ __style: {
    border: '0px',
    clip: 'rect(1px,1px,1px,1px)',
    height: '1px',
    overflow: 'hidden',
    padding: '0px',
    position: 'absolute',
    width: '1px'
  } })

  /**
   * inline
   *
   * display: inline
   */
  const inline = b({ __style: { display: 'inline' } })// b('display: inline;')

  /**
   * inlineBlock
   *
   * display: inline-block
   *
   * 1. Fix for Firefox bug: an image styled `max-width:100%` within an
   * inline-block will display at its default size, and not limit its width to
   * 100% of an ancestral container.
   */
  const inlineBlock = b({ __style: {
    display: 'inline-block',
    maxWidth: '100%'
  } })

  /**
   * table
   */
  const table = b({ __style: { display: 'table' } }) // b('display: table;')

  /**
   * table-row
   */
  const tableRow = b({ __style: { display: 'table-row' } }) // b('display: table-row;')

  /**
   * table-row-group
   */
  const tableRowGroup = b({ __style: { display: 'table-row-group' } }) // b('display: table-row-group;')

  /**
   * table-cell
   */
  const tableCell = b({ __style: { display: 'table-cell' } }) // b('display: table-cell;')

  /**
   * table-column
   */
  const tableColumn = b({ __style: { display: 'table-column' } }) // b('display: table-column;')

  /**
   * table-column-group
   */
  const tableColumnGroup = b({ __style: { display: 'table-column-group' } }) // b('display: table-column-group;')

  /* FLEXBOX
     cookbook/layout/flexbox.md */

  /**
   * Container
   */
  const flexBlock = b({ __style: { display: 'flex' } })
  const flexInline = b({ __style: { display: 'inline-flex' } })

  /* Applies to flex container
     ========================================================================== */

  /**
   * Direction: row
   */
  const flexRow = b({ __style: { flexDirection: 'row' } })
  const flexRowReverse = b({ __style: { flexDirection: 'row-reverse' } })

  /**
   * Direction: column
   */
  const flexCol = b({ __style: { flexDirection: 'column' } })
  const flexColReverse = b({ __style: { flexDirection: 'column-reverse' } })

  /**
   * Wrap
   */
  const flexWrap = b({ __style: { flexWrap: 'wrap' } })
  const flexNoWrap = b({ __style: { flexWrap: 'nowrap' } })
  const flexWrapReverse = b({ __style: { flexWrap: 'wrap-reverse' } })

  /**
   * Justify content
   *
   * Align items along the main axis (x-axis) of the current line of the flex container
   *
   * @param [v = 'initial'] {String} - can be 'start', 'end', 'center', 'between', 'around'
   * @return {Object}
   */
  function flexJustify (v = 'initial') {
    // TODO https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content#Values
    const map = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      between: 'space-between',
      around: 'space-around'
    }
    return b({ __style: { justifyContent: map[v] || 'initial' } })
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
    // todo https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
    const map = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      baseline: 'baseline'
    }
    return b({ __style: { alignItems: map[v] || 'initial' } })
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
    // todo https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
    const map = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      between: 'space-between',
      around: 'space-around'
    }
    return b({ __style: { alignContent: map[v] || 'initial' } })
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
    // todo https://developer.mozilla.org/en-US/docs/Web/CSS/align-self
    const map = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      stretch: 'stretch',
      baseline: 'baseline',
      around: 'space-around',
      auto: 'auto'
    }
    return b({ __style: { alignSelf: map[v] || 'initial' } })
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
    return b({ __style: { order: isNaN(n) ? map[v] || 'initial' : n } })
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
    return b({ __style: { flex: isNaN(n) ? '0 1 0%' : n + ' 1 0%' } }) /* 1 */
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
  // redundant
  // function flexShrink (v = 'initial') {
  //   const n = parseInt(v, 10)
  //   return b({ __style: { flexShrink: isNaN(n) ? 'initial' : n } })
  // }
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
    if (![ 'auto', 'top', 'right', 'bottom', 'left' ].find(i => i === v)) return b({ __style: { margin: 'initial' } })
    else return b((v !== 'auto') ? { __style: { [ 'margin-' + v ]: 'auto' } } : { __style: { margin: 'auto' } })
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
  // redundant
  // function flexBasis (v = 'initial') {
  //   b({ __style: { flexBasis: v } })
  // }

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
  const flexInitial = b({
    __style: {
      flex: '0 1 auto',
      flexBasis: 'auto' /* 1 */
    }
  })

  /**
   * Sizes the item based on the width/height properties, but makes them fully
   * flexible, so that they absorb any free space along the main axis.
   */
  const flexAuto = b({
    __style: {
      flex: '1 1 auto',
      flexBasis: 'auto' /* 1 */
    }
  })

  /**
   * Sizes the item according to the width/height properties, but makes the flex
   * item fully inflexible. Similar to initial, except that flex items are
   * not allowed to shrink, even in overflow situations.
   */
  const flexNone = b({
    __style: {
      flex: '0 0 auto',
      flexBasis: 'auto' /* 1 */
    }
  })

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
    return b({ __style: { verticalAlign: String(v) } })
  }

  return {
    // media queries
    '$notSmall': notSmall,
    '$medium': medium,
    '$large': large,

    borderBox,

    // floats
    clearfix,
    cf: clearfix,
    nbfc,
    nbfcAlt,

    // width
    fill,
    fillAlt,
    fit,
    full,

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
    tableColumnGroup,

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
    // flexShrink, // note: is redundant
    flexExpand,
    // flexBasis, // note: is redundant

    flexInitial,
    flexAuto,
    flexNone,

    // vertical-align
    align
  }
}
