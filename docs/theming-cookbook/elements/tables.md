###### [Theming Cookbook](../index.md)  >  [Typography](./index.md)

# Tables

Tachyons has some basic utilities for styling tables that are easy to customize and extend.

```css
/*

  TABLES
  Docs: http://tachyons.io/docs/elements/tables/

*/

.collapse {
    border-collapse: collapse;
    border-spacing: 0;
}

.striped--light-silver:nth-child(odd) {
  background-color: var(--light-silver);
}

.striped--moon-gray:nth-child(odd) {
  background-color: var(--moon-gray);
}

.striped--light-gray:nth-child(odd) {
  background-color: var(--light-gray);
}

.striped--near-white:nth-child(odd) {
  background-color: var(--near-white);
}

.stripe-light:nth-child(odd) {
  background-color: var(--white-10);
}

.stripe-dark:nth-child(odd) {
  background-color: var(--black-10);
}
```
