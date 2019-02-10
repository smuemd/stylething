###### [Theming Cookbook](../index.md)  >  [Typography](./index.md)

# Word breaking

Break strings when their length exceeds the width of their container.

The `overflow-wrap` (non-standard flavor: `word-wrap`) CSS property sets whether the browser should insert line breaks within words to prevent text from overflowing its content box.

```js
import b from 'bss'

const textBreak = b`
  word-wrap: break-word;
  overflow-wrap: break-word;`
```

## BSS helper preset

Stylething provides an optional BSS helper shortcut to enable word breaking.

- `b.textBreak` -  Break strings when their length exceeds the width of their container.

<!-- ```postcss
/**
 * Word breaking
 *
 * Break strings when their length exceeds the width of their container.
 */

.u-textBreak {
  word-wrap: break-word !important;
}
``` -->