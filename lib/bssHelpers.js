/* Reset (input, button, list)
   cookbook/elements/forms.md
   cookbook/elements/lists.md */

/**
 * basic resets control to remove default styles from buttons inputs and lists
 *
 * @param [type] {String} - reset 'input' | 'button' | 'list'
 * @return {Object}
 */
function reset (type = 'input') {
  const map = {
    button: {
      '::-moz-focus-inner': {
        border: '0',
        padding: '0'
      }
    },
    input: {
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      '::-moz-focus-inner': {
        border: '0',
        padding: '0'
      }
    },
    list: {
      listStyle: 'none'
    }
  }
  return map[type] || map.input
}

/* Layout utils
   cookbook/layout/utilities.md */

/**
 * Center block elements along the x-axis
 *
 * @type {{marginRight: string, marginLeft: string}}
 */
const center = {
  marginRight: 'auto',
  marginLeft: 'auto'
}

/* Tables
   cookbook/elements/tables.md */

/**
 * Sets cells inside a <table> to have shared borders.
 * Sets the distance between the borders of adjacent <table> cells to 0
 *
 * @type {{borderCollapse: string, borderSpacing: string}}
 */
const collapse = {
  borderCollapse: 'collapse',
  borderSpacing: '0'
}

/**
 * Sets background color of odd rows in a <table>
 *
 * @param [color] {String} - color definition
 * @return {{':nth-child(odd)': {backgroundColor: string}}}
 */
function striped (color = 'lightgrey') {
  return {
    ':nth-child(odd)': {
      backgroundColor: color
    }
  }
}

/* BORDER BOX
     cookbook/layout/box-sizing.md */

/**
 * Tells the browser to account for any border and padding
 * in the values specified for an element's width and height.
 *
 * If you set an element's width to 100 pixels, that 100 pixels
 * will include any border or padding you added,
 * and the content box will shrink to absorb that extra width.
 * This typically makes it much easier to size elements.
 *
 * @type {{boxSizing: string}}
 */
const borderBox = { boxSizing: 'border-box' } // b('box-sizing: border-box;')

/* Background Size
     cookbook/themed/background-size.md */
/**
 * Scales the image as large as possible without stretching the image.
 * If the proportions of the image differ from the element,
 * it is cropped either vertically or horizontally so that
 * no empty space remains.
 *
 * Often used in combination with background image set as an inline style
 * on an html element.
 *
 * @example
 * b`
 *   background-image: url(http://placekitten.com/g/500/500);
 *   width: 100%;
 * `.bgCover
 *
 * @type {{backgroundSize: string}}
 */
const bgCover = { backgroundSize: 'cover' }

/**
 * Scales the image as large as possible without cropping or stretching the image.
 *
 * Often used in combination with background image set as an inline style
 * on an html element.
 *
 * @example
 * b`
 *   background-image: url(http://placekitten.com/g/500/500);
 *   width: 100%;
 * `.bgContain
 *
 * @type {{backgroundSize: string}}
 */
const bgContain = { backgroundSize: 'contain' }

/* Borders
     cookbook/themed/borders.md */

/**
 * use css border short hand with additional optional direction argument
 * argument order does not matter
 *
 * @param [args] {[String<borderWidth?>, String<borderStyle?>, String<borderColor?>, String<direction?>]}
 *
 * @example
 * b.setBorder('currentcolor medium solid', 'all')
 * * @example
 * b.setBorder('top', '3px', 'darkred', 'dashed')
 *
 * @return {Object}
 */
function setBorder (...args) {
  let width
  let style
  let color
  let dir
  const widthMap = { thin: 'thin', medium: 'medium', thick: 'thick' }
  const styleMap = {
    none: 'none',
    hidden: 'hidden',
    dotted: 'dotted',
    dashed: 'dashed',
    solid: 'solid',
    double: 'double',
    groove: 'groove',
    ridge: 'ridge',
    inset: 'inset',
    outset: 'inset'
  }
  const dirMap = {
    all: 'all',
    top: 'top',
    right: 'right',
    bottom: 'bottom',
    left: 'left'
  }

  for (let i = 0; i < 4; i++) {
    const arg = args[i]
    if (arg == null) continue
    if (dirMap[arg] != null) dir = arg
    else if (styleMap[arg] != null) style = arg
    else if (widthMap[arg] != null || (!isNaN(Number.parseFloat(arg)) && arg.split(' ').length < 2)) width = arg
    else color = arg
  }

  const direction = dir || 'all'
  const border = (direction === 'all') ? args.filter(x => x !== dirMap[x]).join(' ') || 'medium solid currentcolor' : undefined
  const borderWidth = width || 'medium'
  const borderStyle = style || 'solid'
  const borderColor = color || 'currentcolor'
  const fallback = (!width && !style && color)

  const resMap = {
    all: fallback ? { border } : { borderWidth, borderStyle, borderColor },
    top: fallback
      ? { border: color, borderLeftStyle: 'none', borderBottomStyle: 'none', borderRightStyle: 'none' }
      : { borderWidth, borderTopStyle: borderStyle, borderColor },
    right: fallback
      ? { border: color, borderLeftStyle: 'none', borderBottomStyle: 'none', borderTopStyle: 'none' }
      : { borderWidth, borderRightStyle: borderStyle, borderColor },
    bottom: fallback
      ? { border: color, borderLeftStyle: 'none', borderRightStyle: 'none', borderTopStyle: 'none' }
      : { borderWidth, borderBottomStyle: borderStyle, borderColor },
    left: fallback
      ? { border: color, borderBottomStyle: 'none', borderRightStyle: 'none', borderTopStyle: 'none' }
      : { borderWidth, borderLeftStyle: borderStyle, borderColor }
  }

  return resMap[direction]
}

/**
 *
 * @param args {[String, String]} - <direction>, <value>
 * @return {*|{borderStyle: string}}
 */
function setBorderStyle (...args) {
  let value
  let dir
  // let values = [ 'none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'initial' ]
  const directions = [ 'all', 'top', 'right', 'bottom', 'left' ]

  for (let i = 0; i < 2; i++) {
    const arg = args[i]
    if (arg == null) continue
    if (directions.find(x => x === arg)) dir = arg
    else if (typeof arg === 'string') value = arg
  }

  const direction = dir || 'all'
  const borderStyle = direction === 'all' ? value || 'initial' : value.split(' ')[0] || 'initial'
  const resMap = {
    all: { borderStyle },
    top: { borderTopStyle: borderStyle },
    right: { borderRightStyle: borderStyle },
    bottom: { borderBottomStyle: borderStyle },
    left: { borderLeftStyle: borderStyle }
  }

  return resMap[direction] || { borderStyle: 'initial' }
}

/**
 *
 * @param args {[String, String]}
 * @return {Object}
 */
function setBorderColor (...args) {
  let value
  let dir

  const directions = [ 'all', 'top', 'right', 'bottom', 'left' ]

  for (let i = 0; i < 2; i++) {
    const arg = args[i]
    if (arg == null) continue
    if (directions.find(x => x === arg)) dir = arg
    else value = arg
  }

  const direction = dir || 'all'
  const borderColor = value || 'currentcolor'

  const resMap = {
    all: { borderColor },
    top: { borderTopColor: borderColor },
    right: { borderRightColor: borderColor },
    bottom: { borderBottomColor: borderColor },
    left: { borderLeftColor: borderColor }
  }
  return resMap[direction]
}

function setBorderWidth (...args) {
  let value
  let dir

  const directions = [ 'all', 'top', 'right', 'bottom', 'left' ]

  for (let i = 0; i < 2; i++) {
    const arg = args[i]
    if (arg == null) continue
    if (directions.find(x => x === arg)) dir = arg
    else value = arg
  }

  const direction = dir || 'all'
  const borderWidth = direction === 'all' ? value || 'initial' : value.split(' ')[0] || 'initial'

  const resMap = {
    all: { borderWidth },
    top: { borderTopWidth: borderWidth },
    right: { borderRightWidth: borderWidth },
    bottom: { borderBottomWidth: borderWidth },
    left: { borderLeftWidth: borderWidth }
  }

  return resMap[direction]
}

/* Border Radii
   cookbook/themed/border-radii.md */

/**
 *
 * @param [args = ['0', 'all']] {Array<String>} - [<length> | <percentage>, <direction>]
 * @return {Object}
 */
function setBorderRadius (...args) {
  let value = '0'
  let dir = 'all'
  const directions = [ 'all', 'top', 'right', 'bottom', 'left', 'topLeft', 'topRight', 'bottomRight', 'bottomLeft' ]

  for (let i = 0; i < 2; i++) {
    const arg = args[i]
    if (arg == null) continue
    if (directions.find(x => x === arg)) dir = arg
    else value = arg
  }

  const direction = dir || 'all'
  const borderRadius = direction === 'all' ? value || '0' : value.split(' ')[0] || '0'

  const valMap = { pill: { borderRadius: '9999px' } }
  const dirMap = {
    all: { borderRadius },
    top: { borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius },
    right: { borderTopRightRadius: borderRadius, borderBottomRightRadius: borderRadius },
    bottom: { borderBottomRightRadius: borderRadius, borderBottomLeftRadius: borderRadius },
    left: { borderBottomLeftRadius: borderRadius, borderTopLeftRadius: borderRadius },

    topLeft: { borderTopLeftRadius: borderRadius },
    topRight: { borderTopRightRadius: borderRadius },
    bottomRight: { borderBottomRightRadius: borderRadius },
    bottomLeft: { borderBottomLeftRadius: borderRadius }
  }

  return valMap[value] || dirMap[direction]
}

/* DISPLAY
     cookbook/layout/display.md */

/**
 *
 * @type {{display: string}}
 */
const block = { display: 'block' } // b('display: block;')

/**
 *
 * @type {{display: string}}
 */
const hidden = { display: 'none' } // b('display: none;')

/**
 *
 * @type {{border: string, clip: string, height: string, overflow: string, padding: string, position: string, width: string}}
 */
const hiddenVisually = {
  border: '0px',
  clip: 'rect(1px,1px,1px,1px)',
  height: '1px',
  overflow: 'hidden',
  padding: '0px',
  position: 'absolute',
  width: '1px'
}

/**
 *
 * @type {{display: string}}
 */
const inline = { display: 'inline' } // b('display: inline;')

/**
 *
 * 1. Fix for Firefox bug: an image styled `max-width:100%` within an
 * inline-block will display at its default size, and not limit its width to
 * 100% of an ancestral container.
 *
 * @type {{display: string, maxWidth: string}}
 */
const inlineBlock = {
  display: 'inline-block',
  maxWidth: '100%'
}

/**
 *
 * @type {{display: string}}
 */
const table = { display: 'table' } // b('display: table;')

/**
 *
 * @type {{display: string}}
 */
const tableRow = { display: 'table-row' } // b('display: table-row;')

/**
 *
 * @type {{display: string}}
 */
const tableRowGroup = { display: 'table-row-group' } // b('display: table-row-group;')

/**
 *
 * @type {{display: string}}
 */
const tableCell = { display: 'table-cell' } // b('display: table-cell;')

/**
 *
 * @type {{display: string}}
 */
const tableColumn = { display: 'table-column' } // b('display: table-column;')

/**
 *
 * @type {{display: string}}
 */
const tableColumnGroup = { display: 'table-column-group' } // b('display: table-column-group;')

/* FLEXBOX
     cookbook/layout/flexbox.md */

/* Applies to flex container
   ========================================================================== */

/**
 * Flexbox layout is defined using the flex or inline-flex values
 * of the display property on the parent item. This element then
 * becomes a flex container, and each one of its children
 * becomes a flex item.
 *
 * @type {{display: string}}
 */

// causes the element to become a block level flex container
const flexBlock = { display: 'flex' }

// causes the element to become an inline level flex container
const flexInline = { display: 'inline-flex' }

/**
 * flex-direction sets how flex items are placed in the flex container
 * defining the main axis and the direction (normal or reversed)
 *
 * @type {{flexDirection: string}}
 */

// Main Axis equals text direction, Main Start and End points equal content direction
const flexRow = { flexDirection: 'row' }

// Same as flexRow with Main Start and End permuted
const flexRowReverse = { flexDirection: 'row-reverse' }

// Main Axis equals block-axis, Main Start and End points equal before and after points
const flexCol = { flexDirection: 'column' }

// same as flexCol with Main Start and End permuted.
const flexColReverse = { flexDirection: 'column-reverse' }

/**
 *
 * sets whether flex items are forced onto one line or can wrap onto multiple lines.
 * If wrapping is allowed, it sets the direction that lines are stacked.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
 *
 * @example
 * b.flexNoWrap // { flexWrap: 'nowrap' } The flex items are laid out in a single line (default)
 * b.flexWrap // { flexWrap: 'wrap' } The flex items break into multiple lines
 * b.flexWrapReverse // { flexWrap: 'wrap-reverse' } Same as wrap with items in reverse order
 *
 * @type {{flexWrap: string}}
 */
const flexNoWrap = { flexWrap: 'nowrap' }
const flexDoWrap = { flexWrap: 'wrap' } // will overwrite initial b.flexWrap(<value>) helper
const flexWrapReverse = { flexWrap: 'wrap-reverse' }

/**
 *
 * Define how the browser distributes space between and around content items along
 * the Main Axis (x-axis for flex direction row) of the current line of a flex container.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
 *
 * @param [v = 'initial'] {String<'start' | 'end' | 'center' | 'between' | 'around'>}
 * @return {Object}
 */
function flexJustify (v = 'initial') {
  const map = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly'
  }
  return { justifyContent: map[v] || 'initial' }
}

/**
 *
 * Control the alignment of items along the Cross Axis (y-axis when flex direction is 'row')
 * by setting the 'align-self' value on all direct children as a group.
 *
 * Behaves similar to `justify-content` but in the perpendicular
 * direction of the current line of a flex container.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
 *
 * @param v {String<'start' | 'end' | 'center' | 'stretch' | 'baseline'>}
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
  return { alignItems: map[v] || v }
}

/**
 *
 * Define how the browser distributes space between and around content items
 * along the Cross Axis (y-axis for fex-direction: row;) of a flexbox container (when there is extra space).
 * https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
 *
 * Has no effect when there is only one line / row of flex items.
 *
 * @param v {String<'start' | 'end' | 'center' | 'stretch' | 'between' | 'around'>}
 * @return {{alignContent: String}}
 */
function flexAlignContent (v = 'initial') {
  const map = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly'
  }
  return { alignContent: map[v] || v }
}

/* Applies to flex items
   ========================================================================== */

/**
 *
 * Aligns flex items of the current flex line, overriding the align-items value.
 * If any of the item's cross-axis margin is set to auto, then align-self is ignored.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/align-self
 *
 * @example
 * flexAlignSelf('start') // { { alignSelf: 'flex-start' }}
 *
 * @param [v='initial'] {String<'start' | 'end' | 'center' | 'stretch' | 'baseline' | 'auto'>}
 * @return {{alignSelf: string}}
 */
function flexAlignSelf (v = 'initial') {
  const map = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    baseline: 'baseline',
    auto: 'auto'
  }
  return { alignSelf: map[v] || v }
}

/**
 *
 * Change flex item order without editing underlying HTML
 *
 * @param n {Number | String} - e. g. 1, -1, 999, 'first, 'last', 'none' or 0
 * @return {{order: String | Number}}
 */
function flexOrder (n = 'initial') {
  const map = {
    first: -1,
    last: 1,
    none: 0,
    initial: 'initial',
    inherit: 'inherit',
    unset: 'unset'
  }
  return { order: isNaN(Number.parseInt(n, 10)) ? map[n] || 'initial' : n }
}

/**
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
 * @param n = {Number}
 * @return {{flexGrow: string, flexShrink: string, flexBasis: string}}
 */
function flexGrow (n) {
  return {
    flexGrow: isNaN(Number.parseFloat(n)) ? '0' : n,
    flexShrink: '1',
    flexBasis: '0%'
  } /* 1 */
}

/**
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
 *
 * Align item in flex container with `auto` margins
 * http://www.w3.org/TR/css-flexbox-1/#auto-margins
 *
 * valid params are 'all', 'top', 'right', 'bottom', 'left'
 *
 * @example
 * flexExpand('all') // { margin: 'auto' }
 * flexExpand('right') // { marginRight: 'auto' }
 *
 * @param [direction='auto'] {String}
 * @return {{margin: string | marginTop: string | marginRight: string | marginBottom: string | marginLeft: string}}
 */
function flexExpand (direction = 'all') {
  const resMap = {
    all: { margin: 'auto' },
    top: { marginTop: 'auto' },
    right: { marginRight: 'auto' },
    bottom: { marginBottom: 'auto' },
    left: { marginLeft: 'auto' }
  }

  return resMap[direction] || { margin: 'initial' }
}

/**
 *
 * set the initial main size of a flex item.
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
 *
 * Sizes flex item based on the width/height properties
 *
 * @type {{flex: string, flexBasis: string}}
 */
const flexInitial = {
  flex: '0 1 auto',
  flexBasis: 'auto' /* 1 */
}

/**
 *
 * Sizes the item based on the width/height properties, but makes them fully
 * flexible, so that they absorb any free space along the main axis.
 *
 * @type {{flex: string, flexBasis: string}}
 */
const flexAuto = {
  flex: '1 1 auto',
  flexBasis: 'auto' /* 1 */
}

/**
 *
 * Sizes the item according to the width/height properties, but makes the flex
 * item fully inflexible. Similar to initial, except that flex items are
 * not allowed to shrink, even in overflow situations.
 *
 * @type {{flex: string, flexBasis: string}}
 */
const flexNone = {
  flex: '0 0 auto',
  flexBasis: 'auto' /* 1 */
}

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
 *
 * @type {{'::before': {content: string, display: string}, '::after': {content: string, display: string, clear: string}}}
 */
const clearfix = {
  '::before': { content: '" "', display: 'table' },
  '::after': { content: '" "', display: 'table', clear: 'both' }
}

/**
 * New block formatting context
 *
 * This affords some useful properties to the element. It won't wrap under
 * floats. Will also contain any floated children.
 * N.B. This will clip overflow. Use the alternative method below if this is
 * problematic.
 *
 * @type {{overflow: string}}
 */
const nbfc = { overflow: 'hidden' }

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
 *
 * @type {{display: string, width: string}}
 */
const nbfcAlt = {
  display: 'table-cell', /* 1 */
  width: '10000px' /* 2 */
}

/* HOVER EFFECTS
   cookbook/themed/links.md
   cookbook/themed/hover-effects.md */

const _linkTransIn = 'color .15s ease-in'
const _linkHover = { transition: _linkTransIn }
/**
 * Base preset for adding subtile hover animations to links & buttons
 * Mix and match with hover FXs to generate a wide variety of link styles
 *
 * @example
 * let A = b.link.dimHover
 * let B = b.link.growHover
 *
 * @type {{textDecoration: string, transition: string, ':link': {transition: string}, ':visited': {transition: string}, ':hover': {transition: string}, ':active': {transition: string}, ':focus': {transition: string, outline: string}}}
 */
const link = {
  textDecoration: 'none',
  transition: _linkTransIn,
  ':link': _linkHover,
  ':visited': _linkHover,
  ':hover': _linkHover,
  ':active': _linkHover,
  ':focus': {
    transition: _linkTransIn,
    outline: '1px dotted currentcolor'
  }
}

const _dimTransIn = 'opacity .15s ease-in'
const _dimHover = {
  opacity: '.5',
  transition: _dimTransIn
}
/**
 *
 * Dim element on hover by adding the dim helper.
 *
 * @type {{opacity: string, transition: string, ':hover': {opacity: string, transition: string}, ':focus': {opacity: string, transition: string}, ':active': {opacity: string, transition: string}}}
 */
const hoverDim = {
  opacity: '1',
  transition: _dimTransIn,
  ':hover': _dimHover,
  ':focus': _dimHover,
  ':active': {
    opacity: '.8',
    transition: 'opacity .15s ease-out'
  }
}

const _glowTransIn = _dimTransIn // 'opacity .15s ease-in'
const _glowHover = {
  opacity: '1',
  transition: _glowTransIn
}
/**
 *
 * Animate opacity to 100% on hover by adding the glow helper.
 * via http://tachyons.io/docs/themes/hovers/
 *
 * @type {{transition: string, ':hover': {opacity: string, transition: string}, ':focus': {opacity: string, transition: string}}}
 */
const hoverGlow = {
  transition: _glowTransIn,
  ':hover': _glowHover,
  ':focus': _glowHover
}

const _underlineHover = { textDecoration: 'underline' }
/**
 * Underline an element on hover.
 * Works well on links in combination with `link' preset
 *
 * @example
 * b.link.underlineHover.color('pink')
 *
 * @type {{':hover': {textDecoration: string}, ':focus': {textDecoration: string}}}
 */
const hoverUnderline = {
  ':hover': _underlineHover,
  ':focus': _underlineHover
}

const _growHover = { transform: 'scale(1.05)' }
const _growLargeHover = { transform: 'scale(1.2)' }
/**
 *
 * Grow an element on hover
 *
 * Can be combined with overflow-hidden to make background images grow on hover
 * even if you are using background-size: cover
 *
 * @type {{'-moz-osx-font-smoothing': string, backfaceVisibility: string, transform: string, transition: string, ':hover': {transform: string}, ':focus': {transform: string}, ':active': {transform: string}}}
 */
const hoverGrow = {
  '-moz-osx-font-smoothing': 'grayscale',
  backfaceVisibility: 'hidden',
  transform: 'translateZ(0)',
  transition: 'transform 0.25s ease-out',
  ':hover': _growHover,
  ':focus': _growHover,
  ':active': { transform: 'scale(.90)' }
}
const hoverGrowLarge = {
  '-moz-osx-font-smoothing': 'grayscale',
  backfaceVisibility: 'hidden',
  transform: 'translateZ(0)',
  transition: 'transform 0.25s ease-out',
  ':hover': _growLargeHover,
  ':focus': _growLargeHover,
  ':active': { transform: 'scale(.95)' }
}

/**
 *
 * Add pointer on hover
 *
 * @type {{':hover': {cursor: string}}}
 */
const hoverPointer = { ':hover': { cursor: 'pointer' } }

/**
 *
 * Reveal box-shadow on hover.
 *
 * Performant box-shadow animation pattern from
 * http://tobiasahlin.com/blog/how-to-animate-box-shadow/
 *
 * @param [shadow='0px 5px 15px rgba(0, 0, 0, 0.3)'] {String}
 * @param [transition='all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)'] {String}
 * @return {{
 *  position: string,
 *  transition: string,
 *  '::after': {
 *    content: string,
 *    boxShadow: string,
 *    borderRadius: string,
 *    opacity: string,
 *    position: string,
 *    top: string,
 *    left: string,
 *    width: string,
 *    height: string,
 *    zIndex: string,
 *    transition: string
 *   },
 *   ':hover': {
 *     '::after': { opacity: string}
 *   },
 *   ':focus': {
 *     '::after': { opacity: string }
 *   }
 * }}
 */
function hoverShadow (
  shadow = '0px 5px 15px rgba(0, 0, 0, 0.3)',
  transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)'
) {
  return {
    // cursor: 'pointer',
    position: 'relative',
    transition, // 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',
    '::after': {
      content: '""',
      boxShadow: shadow, // '0px 0px 16px 2px rgba(0, 0, 0, .2)',
      borderRadius: 'inherit',
      opacity: '0',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '-1',
      transition // 'opacity 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)'
    },
    ':hover': { '::after': { opacity: '1' } },
    ':focus': { '::after': { opacity: '1' } }
  }
}

const _bgAnimateTrans = 'background-color .15s ease-in-out'
const _bgAnimateHover = { transition: _bgAnimateTrans }
/**
 * add smooth transition effect to an element background on hover
 *
 * Combine with hoverBg and hoberColor presets for
 * many different transition possibilities.
 *
 * @type {{transition: string, ':hover': {transition: string}, ':focus': {transition: string}}}
 */
const bgAnimate = {
  transition: _bgAnimateTrans,
  ':hover': _bgAnimateHover,
  ':focus': _bgAnimateHover
}

/* Skin pseudo
   cookbook/themed/skins-pseudo.md */

/**
 * Customize the background color of an element when
 * it is focused or hovered over.
 *
 * @param color {String}
 * @return {{} | {':hover': { backgroundColor: color }, ':focus': { backgroundColor: color }}}
 */
function hoverBg (color) {
  const hvrbg = { backgroundColor: color }
  return color ? { ':hover': hvrbg, ':focus': hvrbg } : {}
}

/**
 * Customize the color of an element when
 * it is focused or hovered over.
 *
 * @param color {String}
 * @return {{} | {':hover': { color }, ':focus': { color }}}
 */
function hoverColor (color) {
  const hvrcol = { color }
  return color ? { ':hover': hvrcol, ':focus': hvrcol } : {}
}

/* SIZE
    cookbook/layout/widths.md
    cookbook/layout/heights.md */

/**
 *
 * @type {{flex: string, flexBasis: string}}
 */
const fill = {
  flex: '1 1 0%',
  flexBasis: '0%'
}

/**
 *
 * @type {{flex: string, flexBasis: string}}
 */
const fillAlt = {
  flex: '1 1 auto',
  flexBasis: 'auto'
}

/**
 *
 * @type {{flexBasis: string}}
 */
const fit = { flexBasis: 'auto' }

/**
 *
 * @type {{width: string}}
 */
const full = { width: '100%' }

/**
 * set css width and height attributes of an element.
 *
 * By default, defines the size of the content area.
 * If box-sizing is set to border-box, however, it instead
 * determines the height of the border area.
 *
 * Automatically convert values between 0 and 1 to % and values > 1 to px
 *
 * @example
 * setSize('150px', '50vh')) // { width: '150px', width: '50vh' }
 *
 * @param width {String | Number} - <length> | <percentage> | 'auto'
 * @param height {String | Number } - <length> | <percentage> | 'auto'
 * @return {{ width, height? }}
 */
function setSize (width, height) {
  const h = height < 1 && height > 0 ? height * 100 + '%' : height
  const w = width < 1 && width > 0 ? width * 100 + '%' : width
  const wMap = {
    fit: height ? { flexBasis: 'auto', height: h } : fit,
    fill: height ? { flex: '1 1 0%', flexBasis: '0%', height: h } : fill,
    fillAlt: height ? { flex: '1 1 auto', flexBasis: 'auto', height: h } : fill,
    full: height ? { width: '100%', height: h } : { width: '100%' }
  }

  if (!width && !height) return { width: 'initial', height: 'initial' }
  else return wMap[width] || ((width && height) ? { width: w, height: h } : width ? { width: w } : { height: h })
}

/* VERTICAL ALIGN
   cookbook/typography/vertical-align.md */

/**
 *
 * Set vertical alignment of an inline or table-cell box.
 *
 * @param [v = 'initial'] {String} - 'baseline' | 'sub' | 'super' | 'text-top' | 'text-bottom' | 'middle' | 'top' | 'bottom' |
 * @return {{verticalAlign: string}}
 */
function align (v = 'initial') {
  return { verticalAlign: v }
}

/* WORD BRAKING
   cookbook/typography/word-breaking.md */

/**
 * Word breaking
 *
 * Break strings when their length exceeds the width of their container.
 *
 * @type {{overflowWrap: string}}
 */
const textBreak = {
  // wordWrap: 'break-word',
  overflowWrap: 'break-word'
}

/* TEXT ALIGNMENT
   cookbook/typography/text-align.md */

/**
 * Horizontal text alignment
 *
 * @type {{textAlign: string}}
 */
const textCenter = { textAlign: 'center' }
const textLeft = { textAlign: 'left' }
const textRight = { textAlign: 'right' }
const textJustify = { textAlign: 'justify' }
// const textInheritColor = {
//   color: 'inherit'
// }

/* TEXT Kerning
   cookbook/typography/text-kerning.md */

/**
 * Enables font kerning in all browsers.
 * http://blog.typekit.com/2014/02/05/kerning-on-the-web/
 *
 * 1. Chrome (not Windows), Firefox, IE 10+
 * 2. Safari 7 and future browsers
 * 3. Chrome (not Windows), Firefox, Safari 6+, iOS, Android
 */
const textKern = {
  fontFeatureSettings: '"kern" 1', /* 1 */
  fontKerning: 'normal', /* 2 */
  textRendering: 'optimizeLegibility' /* 3 */
}

/* WHITE SPACE
   cookbook/typography/white-space.md */
/**
 * Control whitespace wrapping
 * https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
 *
 * @type {{whiteSpace: string}}
 */
const textNoWrap = { whiteSpace: 'nowrap' }
// const textPre = { whiteSpace: 'pre' }
// const textPreWrap = { whiteSpace: 'pre-wrap' }
// const textPreLine = { whiteSpace: 'pre-line' }

/* MEASURE
   cookbook/typography/measure.md */

/**
 * Limit element width to ~66 characters
 *
 * @type {{maxWidth: string}}
 */
const textMeasure = { maxWidth: '30em' }

/**
 * Limit element width to ~80 characters
 *
 * @type {{maxWidth: string}}
 */
const textMeasureWide = { maxWidth: '34em' }

/**
 * Limit element width to to ~45 characters
 *
 * @type {{maxWidth: string}}
 */
const textMeasureNarrow = { maxWidth: '20em' }

/**
 * Book paragraph style - paragraphs are indented with no vertical spacing.
 *
 * @type {{textIndent: string, marginTop: string, marginBottom: string}}
 */
const textIndent = {
  textIndent: '1em',
  marginTop: '0',
  marginBottom: '0'
}

/* TEXT TRANSFORM
   /cookbook/typography/text-decoration
   /cookbook/typography/text-transform */

/**
 * Specifies how to capitalize an element's text.
 *
 * @type {{textTransform: string}}
 */
const textCaps = { textTransform: 'capitalize' }
const textLowercase = { textTransform: 'lowercase' }
const textUppercase = { textTransform: 'uppercase' }
const textNoTransform = { textTransform: 'none', fontVariantCaps: 'normal' }

/**
 * Control the use of alternate glyphs for capital letters
 *
 * @type {{fontVariantCaps: string}}
 */
const textSmallCaps = { fontVariantCaps: 'small-caps' }
const textSmallCapsAll = { fontVariantCaps: 'all-small-caps' }
const textTitlingCaps = { fontVariantCaps: 'titling-caps' }

/* TEXT DECORATION
   /cookbook/typography/text-decoration.md */

/**
 * Set the appearance of decorative lines on text.
 *
 * The text-decoration CSS property is a shorthand
 * for text-decoration-line, text-decoration-color,
 * and text-decoration-style.
 *
 * @type {{textDecoration: string}}
 */
const textStrikethrough = { textDecoration: 'line-through' }
const textUnderline = { textDecoration: 'underline' }
const textNoUnderline = { textDecoration: 'none' }

/**
 * Text truncation
 *
 * Prevent text from wrapping onto multiple lines, and truncate with an
 * ellipsis.
 *
 * 1. Ensure that the node has a maximum width after which truncation can
 *    occur.
 * 2. Fix for IE 8/9 if `word-wrap: break-word` is in effect on ancestor
 *    nodes.
 *
 * @type {{maxWidth: string, overflow: string, textOverflow: string, whiteSpace: string, wordWrap: string}}
 */
const textTruncate = {
  maxWidth: '100%', /* 1 */
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordWrap: 'normal' /* 2 */
}

/* TEXT TRACKING / LETTER SPACING
 cookbook/typography/letter-spacing.md */
/**
 * Adjust letter-spacing for uppercase text to improve readability.
 *
 * @example
 * let txt = b`
 *   fontSize: 28px;
 *   text-transform: uppercase;`
 *   .textTrackedTight
 *
 * @type {{letterSpacing: string}}
 */
const textTracked = { letterSpacing: '.1em' }
const textTrackedTight = { letterSpacing: '-.05em' }
const textTrackedMega = { letterSpacing: '.25em' }

/* TEXT LINEHEIGHT / LEADING
   cookbook/typography/letter-spacing.md */

const lineHeightSolid = { lineHeight: '1' }
const lineHeightTitle = { lineHeight: '1.25' }
const lineHeightCopy = { lineHeight: '1.5' }
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

  /**
   *
   * Hide child & reveal on hover:
   *
   * Put the hideChild helper on a parent element and any nested element with the
   * .child class will be hidden and displayed on hover or focus.
   *
   * @type {Object}
   */
  const _hideChildTransIn = _dimTransIn // 'opacity .15s ease-in'
  const _hideChildeHover = {
    opacity: '1',
    transition: _hideChildTransIn
  }
  const hideChild = b
    .$nest('.child', { __style: { opacity: 0, transition: _hideChildTransIn } })
    .$nest(':hover .child', b({ __style: _hideChildeHover }))
    .$nest(':focus .child', b({ __style: _hideChildeHover }))
    .$nest(':active .child', b({ __style: _hideChildeHover }))

  return {
    // media queries
    '$notSmall': notSmall,
    '$medium': medium,
    '$large': large,

    // background-size
    bgCover: b({ __style: bgCover }),
    bgContain: b({ __style: bgContain }),

    // borderbox
    borderBox: b({ __style: borderBox }),

    // borders
    setBorder: (...values) =>
      b({ __style: setBorder(...values) }),
    setBorderStyle: (...values) =>
      b({ __style: setBorderStyle(...values) }),
    setBorderColor: (...values) =>
      b({ __style: setBorderColor(...values) }),
    setBorderWidth: (...values) =>
      b({ __style: setBorderWidth(...values) }),

    // border-radii
    setBorderRadius: function (...values) {
      return b({ __style: setBorderRadius(...values) })
    },

    // display
    block: b({ __style: block }),
    hidden: b({ __style: hidden }),
    hiddenVisually: b({ __style: hiddenVisually }),
    inline: b({ __style: inline }),
    inlineBlock: b({ __style: inlineBlock }),
    table: b({ __style: table }),
    tableRow: b({ __style: tableRow }),
    tableRowGroup: b({ __style: tableRowGroup }),
    tableCell: b({ __style: tableCell }),
    tableColumn: b({ __style: tableColumn }),
    tableColumnGroup: b({ __style: tableColumnGroup }),

    // flexbox
    flexBlock: b({ __style: flexBlock }),
    flexInline: b({ __style: flexInline }),
    flexRow: b({ __style: flexRow }),
    flexRowReverse: b({ __style: flexRowReverse }),
    flexCol: b({ __style: flexCol }),
    flexColReverse: b({ __style: flexColReverse }),
    flexNoWrap: b({ __style: flexNoWrap }),
    flexDoWrap: b({ __style: flexDoWrap }),
    flexWrapReverse: b({ __style: flexWrapReverse }),
    flexJustify: value =>
      b({ __style: flexJustify(value) }),
    flexAlignItems: value =>
      b({ __style: flexAlignItems(value) }),
    flexAlignContent: value =>
      b({ __style: flexAlignContent(value) }),

    flexAlignSelf: value =>
      b({ __style: flexAlignSelf(value) }),
    flexOrder: value =>
      b({ __style: flexOrder(value) }),
    flexGrow: num =>
      b({ __style: flexGrow(num) }),
    // flexShrink, // note: is redundant
    flexExpand: direction =>
      b({ __style: flexExpand(direction) }),
    // flexBasis, // note: is redundant

    flexInitial: b({ __style: flexInitial }),
    flexAuto: b({ __style: flexAuto }),
    flexNone: b({ __style: flexNone }),

    // floats
    clearfix: b({ __style: clearfix }),
    cf: b({ __style: clearfix }),
    nbfc: b({ __style: nbfc }),
    nbfcAlt: b({ __style: nbfcAlt }),

    // hover-fx
    link: b({ __style: link }),
    hoverDim: b({ __style: hoverDim }),
    hoverGlow: b({ __style: hoverGlow }),
    hideChild: b({ __style: hideChild }),
    hoverUnderline: b({ __style: hoverUnderline }),
    hoverGrow: b({ __style: hoverGrow }),
    hoverGrowLarge: b({ __style: hoverGrowLarge }),
    hoverPointer: b({ __style: hoverPointer }),
    hoverShadow: (shadow, transition) =>
      b({ __style: hoverShadow(shadow, transition) }),
    bgAnimate,

    // skins-pseudo
    hoverBg: color =>
      b({ __style: hoverBg(color) }),
    hoverColor: color =>
      b({ __style: hoverColor(color) }),

    // size TODO merge fil, fit full into sizeFn
    fill: b({ __style: fill }),
    fillAlt: b({ __style: fillAlt }),
    fit: b({ __style: fit }),
    full: b({ __style: full }),
    size: (width, height) => b({ __style: setSize(width, height) }),

    // word-breaking
    textBreak: b({ __style: textBreak }),

    // horizontal-text-alignment
    textCenter: b({ __style: textCenter }),
    textLeft: b({ __style: textLeft }),
    textRight: b({ __style: textRight }),
    textJustify: b({ __style: textJustify }),
    // textInheritColor: b({ __style: textInheritColor }),

    // text-kerning
    textKern: b({ __style: textKern }),

    // text-white-space
    textNoWrap: b({ __style: textNoWrap }),
    // textPre: b({ __style: textPre }),
    // textPreWrap: b({ __style: textPreWrap }),
    // textPreLine: b({ __style: textPreLine }),

    // text-measure
    textMeasure: b({ __style: textMeasure }),
    textMeasureWide: b({ __style: textMeasureWide }),
    textMeasureNarrow: b({ __style: textMeasureNarrow }),
    textIndent: b({ __style: textIndent }),
    textTruncate: b({ __style: textTruncate }),

    // text-decoration
    textStrikethrough: b({ _style: textStrikethrough }),
    textUnderline: b({ __style: textUnderline }),
    textNoUnderline: b({ __style: textNoUnderline }),

    // text-transform
    textNoTransform: b({ __style: textNoTransform }),

    textCaps: b({ __style: textCaps }),
    textLowercase: b({ __style: textLowercase }),
    textUppercase: b({ __style: textUppercase }),
    textTitlingCaps: b({ __style: textTitlingCaps }),
    textSmallCaps: b({ __style: textSmallCaps }),
    textSmallCapsAll: b({ __style: textSmallCapsAll }),

    // text-letter-spacing
    textTracked: b({ __style: textTracked }),
    textTrackedTight: b({ __style: textTrackedTight }),
    textTrackedMega: b({ __style: textTrackedMega }),

    // line-height
    lineHeightSolid: b({ __style: lineHeightSolid }),
    lineHeightTitle: b({ __style: lineHeightTitle }),
    lineHeightCopy: b({ __style: lineHeightCopy }),

    // form reset
    reset: function (value) {
      return b({ __style: reset(value) })
    },

    // layout util
    center: b({ __style: center }),

    // table
    collapse: b({ __style: collapse }),
    striped: (color) => b({ __style: striped(color) }),

    // vertical-align
    align: value =>
      b({ __style: align(value) })
  }
}
