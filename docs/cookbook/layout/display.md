###### [Theming Cookbook](../index.md)  >  [Layout](./index.md)

# Display

>The display property defines box’s display type, which consists of the two basic qualities of how an element generates boxes: the inner display type, which defines the kind of formatting context it generates, dictating how its descendant boxes are laid out. the outer display type, which dictates how the box participates in its parent formatting context.
>
> — css3 Display Module Spec

Stylething optionally provides single purpose BSS helpers for setting the [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display) of an element.
.
## BSS helpers

**`displays`**

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

## Usage

### Helper set up

Stylething BSS helpers are initialized by passing the return value of `createBssHelpers` into the `helper` function of the `b` instance.
```js
import b from 'bss'
import { createBssHelpers } from 'stylething/cssHelpers'

// initialize helpers
b.helper(createBssHelpers(b))
```

Once initialized, Stylething BSS helpers become available on the the `b` instance.

```js
/* global b */
import m from 'mithril'
import { createStyler } from 'stylething'

const styled = createStyler(b, { m })

// helpers

const Outer = '.Dev-Box' + b.bc('#ddd').mt('10px')
const Inner = '.Dev-Inner' + b.bc('#ff0').margin('10px 0')

// components
const SpanBlock = styled('span.Block' + Inner, b.block)
const Hidden = styled('div.Hidden' + Inner, b.hidden)
const Invisible = styled('div.Invis' + Inner, b.hiddenVisually)
const InlineDiv = styled('div.Inline' + Inner, b.inline)
const InlineBlock = styled('div.InlineBlock' + Inner, b.inlineBlock)
const Table = styled('div.Table' + Inner, b.table)
const Row = styled('div.Row' + Inner, b.tableRow)
const Cell = styled('div.Cell' + Inner, b.tableCell)
const Flex = styled('div.Box', b.flexBlock)
const FlexInline = styled('div.BoxInline', b.flexInline)

m.mount(document.body, { view: () =>
  m('.Test', [
    m('h1.Test-title', 'Stylething helpers: display tests'),

    m('h2.Test-describe', 'b.block'),
    m('h3.Test-it', 'renders as block'),
    m('.Test-run', [
      m(Outer, [
        m(SpanBlock, 'This ', m('code', 'span'),'should be ', m('code', 'block'))
      ])
    ]),

    m('h2.Test-describe', 'b.hidden'),
    m('h3.Test-it', 'renders as none'),
    m('.Test-run', [
      m(Outer, [
        m(Hidden, ['this ', m('code', 'div'), ' should be ', m('code', 'hidden')])
      ])
    ]),

    m('h2.Test-describe', 'b.hiddenVisually'),
    m('h3.Test-it', 'renders as insvisable'),
    m('.Test-run', [
      m(Outer, [
        m(Invisible, ['this', m('code', 'div'), 'should be invisible'])
     ])
    ]),
    
    m('h2.Test-describe', 'b.inline'),
    m('h3.Test-it', 'renders as inline'),
    m('.Test-run', [
      m(Outer, [
        m(InlineDiv, [ 'this ', m('code', 'div'), ' should be ', m('code', 'inline')])
      ])
    ]),

    m('h2.Test-describe', 'b.inlineBlock'),
    m('h3.Test-it', 'renders as inline-block'),
    m('.Test-run', [
      m(Outer, [
        m(InlineBlock, [ 'this ', m('code', 'div'), ' should be ', m('code', 'inline-block')])
      ])
    ]),

    m('h3.Test-it',
    'doesn\'t expand beyond its parent when containing wide children (test in Firefox)'),
    m('.Test-run', [
      m(Outer, [
        m(InlineBlock,
          { style: 'width:200px' },
          m('img',
            { src: 'http://lorempixel.com/300/300/sports/1',
              style: 'margin:10px 0; max-width:100%;' }))
      ])
    ]),

    m('h2.Test-describe', 'b.table, b.tableRow, b.tableCell'),
    m('h3.Test-it', 'render as tables'),
    m('.Test-run', [
      m(Outer, [
        m(Table, [
          m(Row,[
            m(Cell, [
              'this ', m('code', 'div'), ' should be a ', m('code', 'table-cell'),
              ' within a ', m('code', 'table')
            ]),
            m(Cell, [
              ' this ', m('code', 'div'), ' should be a ', m('code', 'table-cell'),
              ' within a ', m('code', 'table')
            ])            
          ])
        ])
      ])
    ])

  ])
})
```
`display` remain accessible as a regular css properties, however, regardless of whether helpers are active or not. Hence, the following methods of assigning `display` to an element is always possible:

```js
// static styled Component
const SoftDiv = styled('div', b('display: inline-block;'))

m.render(document.getElementById('render'), m('div', [
  m(SoftDiv, '...as div with display: inline-block'),
  m(SoftDiv,
   { as: 'span',
     display: 'block' }, // <- dynamic override
   '... as span with display: block')
]))
```

<!-- Tachyons inspiration
```css
/*

   DISPLAY
   Docs: http://tachyons.io/docs/layout/display

*/

.dn {              display: none; }
.di {              display: inline; }
.db {              display: block; }
.dib {             display: inline-block; }
.dit {             display: inline-table; }
.dt {              display: table; }
.dtc {             display: table-cell; }
.dt-row {          display: table-row; }
.dt-row-group {    display: table-row-group; }
.dt-column {       display: table-column; }
.dt-column-group { display: table-column-group; }

/*
  This will set table to full width and then
  all cells will be equal width
*/
.dt--fixed {
  table-layout: fixed;
  width: 100%;
}

```-->
