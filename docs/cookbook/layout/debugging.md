###### [Theming Cookbook](../index.md)  >  [Layout](./index.md)

# Layout Debugging

Tachyons comes with two convenient modules to help debug layout issues you might be having.

## Debug Children

The debug_children module allows you to use a class called “debug” on any element. That element along with any child node will have an outline of 1px solid gold placed on it.

```css
/*

  DEBUG CHILDREN
  
  There is also a handy chrome extension that can 
    be found at http://pesticide.io

*/

.debug * { outline: 1px solid gold; }
```

## Debug Grid

The debug grid module allows you to put a background grid on any element which can help you line elements up vertically and horizontally with eachother. Sometimes across large amounts of whitespace it can be tough to see if things are aligned. The background grid comes in both 8 and 16px columns.

```css
/*

   DEBUG GRID
   http://tachyons.io/docs/debug-grid/

   Can be useful for debugging layout issues
   or helping to make sure things line up perfectly.
   Just tack one of these classes onto a parent element.

*/

.debug-grid {
  background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAFElEQVR4AWPAC97/9x0eCsAEPgwAVLshdpENIxcAAAAASUVORK5CYII=) repeat top left;
}

.debug-grid-16 {
  background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVR4AWOgCLz/b0epAa6UGuBOqQHOQHLUgFEDnAbcBZ4UGwDOkiCnkIhdgNgNxAYAiYlD+8sEuo8AAAAASUVORK5CYII=) repeat top left;
}

.debug-grid-8-solid {
  background:white url(data:image/gif;base64,R0lGODdhCAAIAPEAAADw/wDx/////wAAACwAAAAACAAIAAACDZQvgaeb/lxbAIKA8y0AOw==) repeat top left;
}

.debug-grid-16-solid {
  background:white url(data:image/gif;base64,R0lGODdhEAAQAPEAAADw/wDx/xXy/////ywAAAAAEAAQAAACIZyPKckYDQFsb6ZqD85jZ2+BkwiRFKehhqQCQgDHcgwEBQA7) repeat top left;
}

```
