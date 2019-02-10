###### [Theming Cookbook](../index.md)  >  [Typography](./index.md)

# Forms

Tachyons has some basic form control resets to remove default styles for mobile devices.

```css
/*

   FORMS

*/

.input-reset {
  -webkit-appearance: none;
  -moz-appearance: none;
}

.button-reset::-moz-focus-inner,
.input-reset::-moz-focus-inner {
  border: 0;
  padding: 0;
}
```

```js
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
    }
  }
  return map[type] || map.input
}
```
