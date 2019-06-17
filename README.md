# A Style Thing

Style aware components on top of [Better Style Sheets][bss].

[![Build Status][ci]][travis]
[![Version][]][npm]
[![size]][bundlephobia]
![MIT License][license]
 
[ci]: https://flat.badgen.net/travis/smuemd/stylething
[version]: https://flat.badgen.net/npm/v/stylething
[license]: https://flat.badgen.net/badge/license/MIT/blue
[size]: https://flat.badgen.net/bundlephobia/minzip/stylething

[npm]: https://npmjs.com/package/stylething
[travis]: https://travis-ci.org/smuemd/stylething
[github]: https://github.com/smuemd/stylething
[bundlephobia]: https://bundlephobia.com/result?p=stylething

[bss]: https://github.com/porsager/bss
[systhing]: https://github.com/smuemd/systemthing

```sh
npm i stylething
```

Stylething is a css-in-js utility for creating ~~React~~ Javascript components that have styles attached to them. Stylething works in tandem with the [BSS][bss] library and is inspired by [styled-components](https://www.styled-components.com/) and [@emotion/styled](https://emotion.sh/docs/@emotion/styled).

As with styled-components and @emotion/styled, Stylething allows users to combine visual primitives into component systems by just defining component styles.

Unlike styled-components and emotion, Stylething is geared to also work well with virtual DOM libraries other than React.

### Table of Contents

- [Usage](#usage)
- [Docs](#documentation)
- [Related](#related)
<!-- - [Getting Started](#getting-started) -->

## Usage

### Installation

Sylething was designed to work in concert with [BSS][bss] (css-in-js-layer) and a virtual DOM library of your choosing (currently adapters exist for [React](https://reactjs.org/), [Preact](https://preactjs.com/guide/getting-started) and [Mithril](https://mithril.js.org/)). Install BSS, Stylething and e. g. Mithril via `npm`:

```sh
npm i mithril bss stylething
```

### Setup

First, import the Vdom library and BSS.
Then create a `styled` component factory.

```js
import m from 'mithril'
import b from 'bss'
import { createComponentFactory } from 'stylething'

// Set up styled component factory
const styled = createComponentFactory(b, { m, outputType: 'class' })

// create a component
const PlainButton = styled('button')
```
Stylething ships without dependencies. Hence passing the `BSS` and `Mithril` instance into `createComponentFactory` is required to instrument the `styled` function.

### Style aware components

With `PlainButton` we now have a style aware Mithril component.
 
Style aware means that the component recognises any css style attribute passed as a prop.

```js
// rendering PlainButton with ad hoc style overrides
m.mount(document.body,
  { view: () => 
    m(PlainButton,
      { background: 'transparent',
        borderRadius: '3px',
        border: '2px solid palevioletred',
        color: 'palevioletred',
        margin: '0 1em',
        padding: '0.25em 1em',
        onclick: () => alert('Hello Pinky!') },
      'Click Me'
    )
  }
)
```

A live example [is available here](https://flems.io/#0=N4IgtglgJlA2CmIBcBWAzAOjQdgDQgDMIEBnZAbVADsBDMRJEDACwBcxYR8BjAeytbwByEAB4oEAG4ACaAF4AOuAAiUpQD5RAegmT1CqgfFTZURSABO8Gt1arJG7bvVcQJeAlsR+ZRgCYkPxQQAF9cajoGJgArMh5+QWFGLQAqaQBzWF4AIxpYaQAla1tcQuK7AHkAWVKwaRStAwgwAAdeC1ZpbOkCC146gHJskhIBptb2zuBpbisaQQBhfraqIVYAMRtWdoBPaRCevsGSVh2EVmYIKnSxqj4qE+kTs-goaTkZucXl-jXN212AApsqVpnUQgBKAz3R4ABVgNCuACEAK6sbZUd5PU4IKCAoZojEDKGGKhgDBgXgogSAsD2UEGaTSSQQeAAdyQPWpXn40kBEOkwEZTOkVlYKIsmOkYHxugGpXIwpF0vxzAAjPLpAMABIeLLSKoQC4WYjE3BKkUy+GIqio9H8c1S5VM6a5bgAa3SfWpUE5A1YFhoDxaNCsAnlFudXXaUHgFgKNAkKJIfrQLQAHhGnVHoxZYxY-X4M09eLBoNIQwgWaX4AHXlmcyK+FkC1rK-Bq+crFAG43paH0lc-QAGaRq+BgXuNkMwK7pEcYIITscTqc5-jcMsezn897qaR5OOsfG62D62FXd17Q3G4gAQmJ+0djYGCy37oN8GJkekAF0SUyIQGJCBjQj4nQFFiszWN8EyrAI-zbBYOzAqCZRbKUVKsC0aIACo7C08B+puNAjAM+wkjCnTWlcRRbHaGJYgU+LZIS-DfqSdG2Mo1QYGG+aAsKxgONmJEjAAcpEcjANkAAGYCdGgE6yRgYkkCE+jZqI6rqKe+pcawd7aDpFqiDRVAGQx-A-m6nrelQZjAP6gbBqGawDEB2ZMtkMZxgmSYkNJAxppmnlRj5eZxkFRbpiWZZvO2na1t2Hk-s27RBYl3hdvWYXOmAA5XEFo7jpOeXKjOEjXMVi4oMupWpV50j8G+EAetJu5yPuh4dCeeq8NIF5UFe6G2A+EIaT+rUep+d6mVo5mWWxVCaUyThSJppRzNxUgQq4fCtMQcYiLk2QeK47ieKw3gPCIfjYEgABsoThCAtD0CIqkjPtCRrCIoS-vgZbDb4lBvZEIjbawGCxpIHi8C09ACBgsSuBKnCMGw2EploWjUi0nqqf0WhQ3jYBQCT5Qwx28OI2sKNxCApyESIJCzBALSsC9EQfYwUMALRQP01Nw1kdPI6j+DoyIWMtDjeNUAT6RE2AlNbILxMouTau2Br5Kw7TSPQ5LTMEVEbMmpz3Pg7z4BGswJqcFLFgYyAsvy-jhMHVokC3rAAACaoYEHj0+-bjsM64zPm+zVshL+IRAA).

### Static defaults

Ad hoc style overrides as demonstrated above, shall come in handy when used in tandem with static style definition at component initialisation.

Static component styles may be declared by passing a style definition as the 2nd argument of the `styled` factory.

```js
// pass a fancy button style definition (example uses bss),
// note bss shorthand style attributes!
const FancyButton = styled('button', b`
  bc grey
  c white
  p 12 24
  fs 16
  tt uppercase
  border none
  br 3
  min-width 120
  cursor pointer
  transition 0.3 transform, 0.3 opacity
  bs 0 1 2 rgba(0,0,0,.35)
  -webkit-font-smoothing: antialiased;
`.$hover`
  transform translateY(-1px)
  filter brightness(130%)
  bs 0 1 5 rgba(0,0,0,.35)
`.$active`
  filter brightness(100%)
  transform translateY(0)
  filter 
  bs 0 1 0 rgba(0,0,0,.35)
`)

const tealOrTomato = Math.random() > 0.5 ? 'teal' : 'tomato'

// rendering FancyButton, overriding just backgroundColor
m.mount(document.body,
  { view: () => 
    m(FancyButton,
      { backgroundColor: tealOrTomato,
        onclick: () => alert('Hello Fancy!') },
      'Click Me'
    )
  }
)
```
A live example [is available here](https://flems.io/#0=N4IgtglgJlA2CmIBcAWAbAOgJwA4A0IAZhAgM7IDaoAdgIZiJIgYAWALmLCAQMYD21NvEHIQAHigQAbgAJoAXgA64ACLTlAPjEB6SVI2LqhidLlQlIAE7xaPNmqmadejdxCl4COxAHkmAJiR-AFYQAF88GnpGZgArcl4BIREmbQAqGQBzWD4AI1pYGTAZNO1DQwgwAAc+SzYZXJlCSz5igHJc0lI2iura+uAZHmtaIQBhVprqYTYAMVs2WoBPGTCmlvbSNiWENhYIakyeo2p+ai2ZLZ34KBl5IZHxyYEZ+btlgApcvBlB4rCAJTlU6+eoABVgtAOACEAK5sRbUO6XbYIKAfDrwxFtH7AQwyBq2ADWmRasOoUCQMjabEstHOVVo1kEOPxDVqUHglgASrRJLDSFS2gBmKoAD1ZSPZlk5liF-nFlz4sGgMkZCCkPl21igkoJ-Bycup6vgmuV8FpNz1RSZmQOQoADDIAIzwMDWxkwA6ZR0YEJul1uyWA4FnC7zU5LOEIgTIq5ojG5LECHENAAGbNyPCy1iWbOzAHd9kI2VUXf4ZP4UGzCKQXWg2QiZLCqlUuTxaB5MxyuTJqC9M5YZMK2ZBqABaAvQPblh352GWUi1NV8A5CSyNunnCBsHxIh0YYUyWn00iEWpgH4Ho98Rk8Hd5qWdGRO52VmSWTL5D4OvC-3+HsEQJSpO8C5ESO7juegjjqQYB8HwezelS9K7gUECdjcADchhphgAAkLB8FIXIZlKJ7nOeljFBRpCQkIACaHzjs64rAQSxCwOuDSWBAmTsNMXQfM6woOgApOxDR1q+MjBB+X60D+f7KYBwF4fhCzSPAZEcSQ3G5Lx-FsIJpDCQ64mSbRVE0VudGjPATEOpJnHcZm0kui+8nfv+KnCkBuHAYYYb1EIBQAPKWAAKq0ox8MiACyowsBgW5QK0HwAjIGgvhgckAPzUqFsBtDIQqLGAsXHIYYAYPB5JsB8YAOLibKavABZUoQ5LeLGGW-GyBLWGwC5SmAGJ6KmFDAgSM1FB8EJQtQ0aIngA2zb8MgCDwKo8ESVJ9fI2UFFyDVtAAEp4OQyGCBxEis8U7iwvGwAAhG0mURGts1tGMO1EjI8XwO9q0nOtc0RjwUbJtQINg4M+S7aSfDklAEyGlSRURdFFWLLDYObacf37Zlh0yMddQYhdsBXRDSxvR9ePfYDx4IfT00zQAupJYSGCG1BuPw1QkFyoj5LknhuB4Xi7r4ohYEE-jhJEIB0AwogYDwXQC0kMyiOEHMECq1BEn4VAq9EoiQHsz0AALTGKbBuAuXBMOwbBVIK2jaOSVQkhrrTaFbT0kDb-gYAeDrjpYPAYGggePc9tUHBg8RuNsbaiKQwwQFUjthBzYRAA).

The Stylething API is flexible. Any of the following static style definition flavours (or combinations thereof) are supported:

**1) [BSS][bss] style definition (recommended)**

BSS is the recommended way for defining styles. Refer to the [BSS documentation][bss] for more details.

```js
const Box = styled('div', b`padding 1em`)
```

**2) Hyperscript queries**

```js
const Span = styled('span#identifyer.one.two[hot=true][hyper=coool]') // <span id="identifyer" class="one two" hot=true hyper="cool"></span>
```

**3) Externally defined css classes**

It is possible to reference external css by passing a class string as the second argument

```js
const Box = styled('div', 'externally defined class') // <div class="externally defined class"></div>
```

**4) POJO style definition**

```js
const Box = styled('div', { padding: '1em' })
```

### Inherit and extend

It is possible to extend the static style definition of a previously defined component by passing said component into the `styled` factory as the first argument.

```js
// The Button from the last section without the interpolations
const StandardButton = styled('button', b`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`)

// A new component based on StandardButton, but with some override styles
const TomatoButton = styled(Button, b`
  color: tomato;
  border-color: tomato;
`)
```

Stylething supports the "as" polymorphic prop. This allows users to dynamically swap out the element that will receive the styles down the line.

```js
m.mount(document.body, {
  view: function () {
    return m('div', [

      m(StandardButton,
        { onclick: () => alert('Hello Standard!') },
        'Click Me'),

      m(TomatoButton,
        { onclick: () => alert('Hello Tomato!') },
        'Me too!'),

      // render `StandardButton` as a linl  (`<a></a>`)
      m(StandardButton,
        { as: 'a',
          fontFamily: 'sans-serif',
          href:'#',
          onclick: () => alert('Hello Standard as Link!') },
        'As link!')
    ])
  }
})
```

A live example [is available here](https://flems.io/#0=N4IgtglgJlA2CmIBcBWAjAOgOwBoQDMIEBnZAbVADsBDMRJEDACwBcxYQ8BjAe0pfj9kIADxQIANwAE0ALwAdcABFJigHwiA9OIlr5lfWMkyoCkACd41LixUT1WnWs4hi8BDYh9SDAExJfFBAAXxwqWnpGACtSbj4BIQZNACopAHNYHgAjalgpMClkzX0IMAAHHnMWKSypfHMeAoByLOJiJpLyyurgKS5LagEAYUaKykEWADFrFkqATylguobm4hY5hBYmCEo0joNKXko1qTWN+CgpWT6B4dG+CembeYAKLJwpXoLggEp9fU0mikABUmPApAAhACuLFmlGWjSkW3BsGoJzcnj4UgA7hAtjwYUiwTJ+PBzBVUSwvMd9EcTgBlFjUShQajmKDQ2FY65nBBQF4tGFwpofLIAA30Uj6PEy5iQUjKuXgEi8m0sUAA3JK6vEALTECAAL3g8rQ8DAWvh+TZaR2pvNlqlipgOzS8oADBhAuapGaLdqspUoGT5b4ygAPU4y6AKpUqmXwFjqx01INk3XmajiKHEeUAZgjGrFfwOgKkAEEpONsdKuuN+DU0RcpFjGczWezOXDRYTcVso3QWxIyeZoODefBiLTvNVgY1Bjwu9zTus+S82yy2RyhXxRRKrc7xLsPRgUD7MGf-VbeLL5bMwAuU4H2emb5U7-PZkWS-owBgwAS-AvGAdgfMA2oqvA2LyvgUKHFSWIvD8nzalKlgsFC5hWmAAo6CKUhkP8VpSlKOEbh225cpQOCoSRUq9HwXCwBAXAANbykhVxqFISpVAKAAS7iZFI5FbgAhE0yGhLRdFNEMzFsVIACy8CSTRBx0aRLxzg+sxLtRMkkQxhwKexUicbI3G8SwAlCTwIKfjwElSepmkkU0KlIjwTlqYZhlkUym6djuBnEZpvRovKTTUCKhl0fg8TTJAsBzFFxDMsQ+pkhA+CxWFblMJY+BIE0ADEeVuXRjGmRxyGWTxCB8U0gmwMJonsjxxBSAAMjsrHOYsrmVU05ZdcxlD9ZJtEALollKwT6L8+guLw5REGSwg5Fk7guG4HgIccwjukgaC+CEYQgDQdDCBgXBtCt8QTMIITTXg42sT4FCXREwiQFso6wAAAuM4YsC4mEcAwrAsGUuaAnBZSsWkt2NJof2FUQgO+BgnruhmXAYAAbGjeIY7A-47BgMQuOsZSRMQ-QQGUYPBNNwRAA)


### Responsive Styles and Theming

For handling responsive styles, it is recommended to define media queries directly on the [BSS][bss] instance.

```js
import m from 'mithril'
import b from 'bss'
import { createComponentFactory } from 'stylething'

// use BSS media query groupers
b.helper('notSmall', style => b.$media('screen and (min-width: 30em)', style))
b.helper('large', style => b.$media('screen and (min-width: 60em)', style))

// set up styled component factory
const styled = createComponentFactory(b, { m })

// create a responsively styled static component
const Responsive = styled('button', b`
  border: 2px solid palevioletred;
  border-radius: 3px;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
`.notSmall`
  border: 2px dotted tomato;
  border-radius: 5px;
  color: tomato;
  font-size: 20px;
  padding: 0.4em 1.25em;
`.large`
  border: 2px solid red;
  border-radius: 7px;
  color: red;
  font-size: 24px;
  padding: 0.6em 1.4em;
`)

m.mount(document.body,
  { view: () =>
    m(Responsive,
      { onclick: () => alert('Hello responsive thing!') },
      'Responsively styled with BSS')
})
```
A live example [is available here](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvAHgBMIA3AAgjYF4AOiCwARLsIB8LAPQdOkwWiXsuvAcIBOMDNWLjOU2fMmUQcGLD0R6CRCABMiBwFYQAXwrpsue-gBWCFR0DEzEeDIAVNwA5lC0AEYYUNxY3JEyShBYAA60msTcCdxgmrRpAOQJcHAVWbn5hcDc1NoYjADC5XloYQBiusT5AJ7c7iVllXDEw7DEhBBoMXXKaDIy3ACuFtwAQgDK+6kwHBjcAI6bMJqjMWWbOddwSglElo+aABQVaLTE+1hklAKhRuNNZjBuPxJEV8AASHCnb5wVowJjcDBoNjcT5YRYAWgA7nx5ohuABmAAMMCwAEoQWCZrBabSXm8oB9vlAMJoYjAGeDYFCYa8EScIBhkaj0ZjsbiCcS2KTuAA2al0gVMmAspRKdZgmCFB6MiHYugNXoMEqDEZKELTE2wbH8FptTrdej9G03T4JUHNNLuVmrfWo9qQs7aOA9OBcSyjQUnRntCDUFoey3EO22QoAJXgMbjUMdJ2+CU2xCGaAZCQABkpuEV8mxrmSHDkAB5g2hQPjcHLJGCcGxzbRsADcDabmhbmnxmgwHG2ZPJncnaEbdHimjJA9gw57hrH68bYHoxHxsYAXjAyQBGGkn1I8mKLe+PqcDtgcJZkyn4VwaW4B8sHXWt8F+f5ASgKB6w3adZzbTtuDYP5GGxIZASGJ8Emba550XCBl24Fw1ynLd8jJTD2loJ8zwYS8IBvNtKTI+Cvx-GI-3wAAWIC7wAlwPzQcDuV5GA4MbXCZ1bbh2y7OAez7Y8p2k2cCKXOAyQAdjYzce0o7gVPg+iL2vW85J4vT+0XTjuJVfjeOE2tgyULB8CwWhNgYXEDH9KdhxgQkyTAbzrHoHFaW4YAp0bbRiE2TR4Kwb55AZZBYsbVJPnzaNbDjChMqy6LuHoahe2oABrMlPii6EMVgApvgACUseJuFywtOBgABCCoos8IqsoqTr8u6qAEy1bFiXmPZDn6oqAF1g0bdwlCDJQzHNHJoGuPAkgSSwzAsKxiBsNA7BASlEDvHiPC8EBMBwPB8GoGotvPMI8A8RaqF7NBKrsVBHp8PA8XmTRoAAAV6DtwioRLyHsEhiByLT1m8nJKpiV7yhkcHCEhqAYZgOGzBmR48BRSGcnCdxFvcIA)

Preconfigured media query groupers for BSS are available in [the `stylething/bssHelpers` module](lib/bssHelpers.js). The following examples illustrates how to activate Stylething helpers:

```js
import b from 'bss'
import { createBssHelpers } from 'stylething/bssHelpers.esm'

// initialising Stylething helpers on the BSS instance
b.helper(createBssHelpers(b))
```
Initialize Stylething helpers by passing the return value of the `createBssHelpers` function into the `helper` method of the `b` instance.

_[TODO] link to list of available helpers_

### CSS systems

The `styled` component factory was designed to also work in tandem with style yielding functions provided by libraries such as [Systemthing][systhing] and [styled-system](https://github.com/jxnblk/styled-system). This represents an alternative (albeit slightly more expensive) approach to working with themed values and responsive styles. 

Tapping style yielding functions is useful in situations where responsive ad hoc style overwrites can not be avoided.

Style yielding functions are available via `npm`.

```sh
npm i systemthing
```

The `styled` component factory can then be overloaded with n-number of these functions.

```js
import { borderRadius, borders, color, fontSize, space } from 'systemthing'

// create a dynamic responsively styled component
const Responsive = styled('button', borderRadius, borders, color, fontSize, space)

m.mount(document.body,
  { view: () =>
    m('div',
      m(Responsive, {
        // hardcoded border def across multiple breakpoints
        border: [ '2px solid palevioletred', '2px dotted tomato', '2px solid red' ],
        // hardcoded border radii across multiple breakpoints
        borderRadius: [ '3px', '5px', '7px' ],
        // hardcoded color across multiple breakpoints
        color: [ 'palevioletred', 'tomato', 'red' ],
        // fontSize values on the default typographic scale across multiple breakpoints
        fontSize: [ 1, 2, 3 ],
        // hardcoded padding across multiple breakpoints
        padding: [ '0.25em 1em', '0.4em 1.25em', '0.6em 1.4em' ],
        // hard coded non responsive margins
        margin: '1em',
        // component event handler
        onclick: () => console.log('works')
      }, 'Very responsive')
    )
  }
)
```
A live example [is available here](https://flems.io/#0=N4Igxg9gdgzhA2BTEAucD4EMAONEBMQAaEAMwEskZUBtUKTAW2TQDoALAF0fmPSk6IBqECAC+RekxYhWAK2olIAoZxEB6AFQACAObwIAI0zxtjbZvUAdKOUbYIAJ07bD20o4jmA5IZgxvGzsHZ21gbTBHRExBAGEvByhVADFMME4nAE9tMXdPHxhOTKROdnIoXUDbeycXcMMnfERHACVMfHIAVxgiV0bmnoiEJ17SaE4AZXIAL0RemGw0xBy8r21vGEzCxEZS8sqbG3V1bTwXTuxToqR8IZqkgXc0jMdMm2VCq+KCbQBeCKiMUQ8XuKWeWQAFIZeuFzGIAJSHKDHAHRQTaTDaKILaAwcgAN0Q8GyhW+t0KMXIYDuiVU71xLhaiBxsAJy3+pJuEN8nU4GSg3l6DUcTVa7S6g2FosGkAMjlG4yms3mizAiERUHpsBcOEu-3C+PIiAA7ihtBD4X8AHw2bRmbkdfGC7Q0W12+1Mll4wkwt3u7Qo9iYEWQJq3KXNbRNUgYyIQfxmTrwTjkbBIVyAgDWDnKnBgfvdEccZpo6wATNgAB6nBDkW6LJCGhCIThRfDO7wV6v4CB8n4ZRgxCAdrs1+B1rEEbzaAC6RALdsDwfwoZ+Rax4vIsc8CcYSZTaeWhizOYE+ag-rtRbaHW6JfWAGYqx2AKzP3reADsz9n84vl6XEMIDDIY5W3eMYETZNU3TY9omzCBc3PS9QKce9vAbRAmxKNsOwHIcO1w38FwDE4xgEJVlnxExOmZbRoG0UplmjTB90YzIHF0RwcDKakYDAExljSHdIL3aDDwzeDTzzEjyMmGZEHvMtegfXoABZiP-f1AJXYCfkWfAOgqcDd33GCjxPRCzxIgyjN0dCAAZWDLF8dm0ABGHYOyctS3Pc5zXMYbzWAANj81hfKCzSUJ0oYQKgBjsUSb1lkHRxdHKZDLzSjKoDNbxPKCv8YpOSBQUeLDVG0IMoHwJBHBI6AwHHMBMzNC1rQxerOG5Y0nEzAINX9CR1gANWabIktxNlvCG2cNTEJFGFYRgIE6AQIR7MBOmYARWAafBMl6XUNT4MrsEoZoRGMQwiT4PAkHSchcREMtPxQB8X3ESQQAYZgRFYMB-DO8ZVBEcQ5xAccoAG2gpH+tBNm2XYygqPhOkcXg0C4ThcBQY51uwTNdEBrx1CRwQUf2AABfzPzU1gHPUDpCnJrZKb2Cp5EUEAimwGR+McVM1AkeGZEYchSiF+BqaSSs1BIDGsZAHG8YJqAiZJsr1AlqXKGpstGcZgBaRwwFCnXJfYaWVvKbm+D5gXImFiGxCAA).

#### Custom theme

Systemthing's default values can be customised when initially setting up the `styled` factory. Here is an idiomatic example that passes a custom theme into Stylethings `createComponentFactory` function.

```js
import m from 'mithril'
import b from 'bss'
import { borderRadius, borders, color, fontSize, space } from 'systemthing'
import { createComponentFactory } from 'stylething'

const newTheme = {
  breakpoints: [ '32em', '48em', '64em' ],
  space: [ 0, 6, 12, 18, 24 ],
  fontSizes: [ 12, 16, 18, 24, 36, 72 ],
  radii: [ 3, 5, 7],
  colors: {
    blue: '#07c',
    green: '#1c0',
    gray: ['#ccc', '#555']
  }
}

// aliases
newTheme.space.big = 64
newTheme.fontSizes.big = 128

const styled = createComponentFactory(b, {
  m,
  outputType: 'class',
  theme: newTheme
})

const Button = styled('button', b`
  bc grey
  c white
  p 12 24
  fs 16
  tt uppercase
  border none
  br 3
  min-width 120
  cursor pointer
  transition 0.3 transform, 0.3 opacity
  bs 0 1 2 rgba(0,0,0,.35)
  -webkit-font-smoothing: antialiased;
`.$hover`
  transform translateY(-1px)
  filter brightness(130%)
  bs 0 1 5 rgba(0,0,0,.35)
`.$active`
  filter brightness(100%)
  transform translateY(0)
  filter 
  bs 0 1 0 rgba(0,0,0,.35)
`, borderRadius, borders, color, fontSize, space)

m.mount(document.body,
  { view: () =>
    m('div',
      m(Button, {
        // hardcoded border def across multiple breakpoints
        border: [ '2px solid palevioletred', '2px dotted tomato', '2px solid red' ],
        // themed border radii (theme.radii) across multiple breakpoints
        borderRadius: [ 0, 1, 2 ],
        // hardcoded color across multiple breakpoints
        color: [ 'blue', 'green', 'gray.0' ],
        // fontSize values on custom typographic scale (theme.fontSizes) across multiple breakpoints
        fontSize: [ 1, 2, 3 ],
        // themed vertical and horizontal padding (theme.space) across multiple breakpoints
        py: [ 1, 2, 3 ],
        px: [ '1em', '1.25em', '1.4em' ],
        // hard coded non responsive margins
        margin: '1em',
        // component event handler
        onclick: () => console.log('Hello Fancy Responsive')
      }, 'Resoposively themed')
    )
  }
)
```

Live example [is availabe here](https://flems.io/#0=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)

An example theme with preset values can be obtained from the [the `stylething/theme` module](lib/theme.js).

```js
import * as dfaultTheme from 'stylething/theme.esm'
```

The default theme exposes the following values

```js
/* lib/theme.js */ 

// docs/style-cookbook/media-queries.md
export const breakpoints = [ '30em', '60em' ]

// docs/style-cookbook/layout/spacing.md
export const space = [ 0, '.25rem', '.5rem', '1rem', '2rem', '4rem', '8rem', '16rem' ]

// docs/style-cookbook/typography/type-scale.md
export const fontSizes = [ '.75rem', '.875rem', '1rem', '1.25rem', '1.5rem', '2.25rem', '3rem', '5rem', '6rem' ]
fontSizes.subheadline = fontSizes[ 7 ]
fontSizes.headline = fontSizes[ 8 ]

// docs/style-cookbook/themed/border-radii.md
export const radii = [ '0', '.125rem', '.25rem', '.5rem', '1rem' ]
radii.pill = '9999px'
radii.max = '100%'

// docs/style-cookbook/themed/colors.md
export const colors = {
  // Grayscale Solids
  black: '#000',
  nearBlack: '#111',
  darkGray: '#333',
  midGray: '#555',
  gray: '#777',
  silver: '#999',
  lightSilver: '#aaa',
  moonGray: '#ccc',
  lightGray: '#eee',
  nearWhite: '#f4f4f4',
  white: '#fff',

  // Grayscale Transparencies
  transparent: 'transparent',
  black90: 'rgba(0,0,0,.9)',
  black80: 'rgba(0,0,0,.8)',
  black70: 'rgba(0,0,0,.7)',
  black60: 'rgba(0,0,0,.6)',
  black50: 'rgba(0,0,0,.5)',
  black40: 'rgba(0,0,0,.4)',
  black30: 'rgba(0,0,0,.3)',
  black20: 'rgba(0,0,0,.2)',
  black10: 'rgba(0,0,0,.1)',
  black05: 'rgba(0,0,0,.05)',
  black025: 'rgba(0,0,0,.025)',
  black0125: 'rgba(0,0,0,.0125)',
  white90: 'rgba(255,255,255,.9)',
  white80: 'rgba(255,255,255,.8)',
  white70: 'rgba(255,255,255,.7)',
  white60: 'rgba(255,255,255,.6)',
  white50: 'rgba(255,255,255,.5)',
  white40: 'rgba(255,255,255,.4)',
  white30: 'rgba(255,255,255,.3)',
  white20: 'rgba(255,255,255,.2)',
  white10: 'rgba(255,255,255,.1)',
  white05: 'rgba(255,255,255,.05)',
  white025: 'rgba(255,255,255,.025)',
  white0125: 'rgba(255,255,255,.0125)',

  // Colors
  darkRed: '#e7040f',
  red: '#ff4136',
  lightRed: '#ff725c',
  orange: '#ff6300',
  gold: '#ffb700',
  yellow: '#ffd700',
  lightYellow: '#fbf1a9',
  purple: '#5e2ca5',
  lightPurple: '#a463f2',
  darkPink: '#d5008f',
  hotPink: '#ff41b4',
  pink: '#ff80cc',
  lightPink: '#ffa3d7',
  darkGreen: '#137752',
  green: '#19a974',
  lightGreen: '#9eebcf',
  navy: '#001b44',
  darkBlue: '#00449e',
  blue: '#357edd',
  lightBlue: '#96ccff',
  lightestBlue: '#cdecff',
  washedBlue: '#f6fffe',
  washedGreen: '#e8fdf5',
  washedYellow: '#fffceb',
  washedRed: '#ffdfdf'
}
```
## Documentation

- _todo_

## Related

- [bss](https://github.com/porsager/bss)
- [systemthing]()
- [styled-system](https://github.com/jxnblk/styled-system)
- [styled-components](https://github.com/styled-components/styled-components)
- [emotion](https://github.com/emotion-js/emotion)
- [SUIT CSS](https://suitcss.github.io/)

[MIT License](LICENSE)
