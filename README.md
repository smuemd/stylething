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
- [Docs](#docs)
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
A live example [is available here](https://flems.io/#0=N4IgtglgJlA2CmIBcAWAbAOgJwA4A0IAZhAgM7IDaoAdgIZiJIgYAWALmLCAQMYD21NvEHIQAHigQAbgAJoAXgA64ACLTlAPjEB6SVI2LqhidLlQlIAE7xaPNmqmadejdxCl4COxAHkmAJiR-AFYQAF88GnpGZgArcl4BIREmCDAABz5LNhkwGUJLPjyAckg2FksSAAFqeAAPNmLDNMzsmQAjfMKS9tJSJuoWrJzgGR5rWiEAYSLM2sEAMVs2LIBPGTCuopli0jZVhHKIagBzAcN+aj2ZPYP4KBl5MYnp2YFhNiW7NYAKdrwZKM8mEAJSGC6+HIABVgtGOACEAK5sFbUR43fYIKA-YrtZGo4oA4CGGQdWwAaxOhUR1CgSB2bEstCu6Vo1kEhJJHSyUHglgASrRJIjSPTigBmdJ1Tlo7mWXmWMX+KU3PiwaAyVkIKQ+Q7WKAy0n8WBZMVa+A6tXwRn3Q25NknY5igAMMgAjPAwHbWTBjicXRgQp73Z6ZaDwdRLtclpHVkiUQJ0bcsTi8QnqISOgADLntHgyKnwVZc-MAdxYECEXPS7v8Mn8KC5hFI7rQXJRMkR6XSfJ4tA8uZ5fJk1HeucsMnFXMg1AAtKXoOVa86S4jLKQspq+MchJZ20yrpWfGjnRhxTJGczSIQsmAAafz3xWTxK8XZb0ZK63fWZJYTu1aB+Z08GA4Cz2CMFZXneB2nJStZxvQRZ1IMA+D4I5TnpZk2AgWh1X7e4AG5DCzDAABIWD4KQ+RzWVLyuG9LDyejSFhIQAE0flnN0pUg0liFgXcOkqE52FqPofjdcVnQAUj4joWy-GRgl-f9ANAkC8HAyDSLI5ZpHgWj+JIIT2hEsT4Akt1nVk+SWMY5iD1YyZ4E4515IEoTc0U91P1UgCgM0sDxQgkjIIhK4ciEPCAHlLAAFSKSY+HRABZSYWAwA8oCKH4QRkDRPwwFSAH4GRsWBihkMUVjAZLzmoMAMFQmk2B+MAHCJLkdXgUt6UIGlvETPLAS5UlrDYNdZTAHE9EzCgI1JJbch+GE4WoeNUTwMblsBGQBB4dUeHJekRvkQq8L5NrigACU8E0ZChY5yXWVLKwqEgAEJinyiIduW4opiO8kZFS+Afu2oxZWWmaYx4ON8QESHdr2gDjqpPgaSgGYTUVC8KrixK6pWZGUf2yNgdO-LzpkS7shxO7YAeuHVm+37SYBsGLzQtnFqWgBdeSwkMcNqDcfgMhIPlRAA9pPDcDwvBw3xRBQZ0kGdcJIhAOgGFEDAeD6cWkg+URwn5sIgA).

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

A live example [is available here](https://flems.io/#0=N4IgtglgJlA2CmIBcBWAjAOgOwBoQDMIEBnZAbVADsBDMRJEDACwBcxYQ8BjAe0pfj9kIADxQIANwAE0ALwAdcABFJigHwiA9OIlr5lfWMkyoCkACd41LixUT1WnWs4hi8BDYh9SDAExJfFBAAXxwqWnpGACtSbj4BIQYIMAAHHnMWKTApfHMebIBySBYmcyIAAUp4AA8WAv1ktIypACMcvMKW4mJ6ykb0zOApLktqAQBhfLSq-gAxaxZ0gE8pYPb8qQLiFiWEEohKAHNe-V5Kbalt3fgoKVlh0YmpvkEWeZtlgAoWnCkh7OCAEp9PpNJopAAVJjwKQAIQArixFpR1tkSjDYNQLm5PHwpAB3CAlHiIqTomT8eDmNKYlhec6nbyZADKLGolCg1HMUARSLx9yuCCgnwKLURyIKvxaAAN9FJhjxYOkkFIUtQEBIvHtLFAANxynLxAC0xAgAC94Cq0PAwPqUVkuYcDlabXb5WqYAdDiqAAwYQI2qTW20GlrpKBUlW+FLVS6K6Cq9XwTWK+AsHVu1rhqlG8zUcTw4gqgDMMd10uBBkoYKkAEEpFV8QrUi9+K0sTcpHjWezOdzecipaTCSU43QuxIqWUI5cdiRGedMhD8mMeAP+bPrsKexyuTzxXwpbL7R7xEdfRgUIHMFeQ-beErzCrFmBV5mw9ycw-lWSV4ty5W+hgBgYAkvwnxgHYvzAAamrwPiKr4PClC4iinyAn8BrypYLDwuY9pgCKOiSlIZAgva8ryoRO59vufKUDgWGUfKQx8FwsAQFwADWKroXcahSEmGQigAEu4SpSDRe4AIQFBhoRMcxBTjBx3FSAAsvAcmMVWzFUZ8y6vos64MYplGsShqk8VIfGyAJQksKJ4k8JCf48LJ8k6XplEFJpv7udpZlmdRbK7v2B6mRRelDFiKoFNQkpmcx+DxPMkCwEscXEOyxAmlSED4IlUXeaU8D4EgBQAMRFd5zFsVZvEYXZgkIMJBRibAElSdygnEFIAAyBxcR5qxebVBS1n1HGUMNclMQAupW8rBPoQL6C4vCpEQVLCC01AtO4LhuB4dLeMIKBID6IRhCANB0MIGBcN0G3xK8wghPNwRAA)


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
A live example [is available here](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvAHgBMIA3AAgjYF4AOiCwARLsIB8LAPQdOkwWiXsuvAcIBOMDNWLjOU2fMmUQcGLD0R6CRCABMiBwFYQAXwrpsue-gBWCFR0DEzEeBBYAA60msTcWNxgmrSJAORYEMSEmtAAAmgwAB7EaUqRMXHcAEZJKenVcHBlaBWx8cDc1NoYjADCqTGFDABiusSxAJ7c7nWp3GlwxJOw2RBoAOYtSjIy3ACuFtwAQgDKpwkwHBjcAI77MJrTGyn7UY9wStVElu+aABRpNC0YinLAYKBQNIUbhLFYwbj8SQ1fAAEhw10BcG6MCY3AwaDY3H+mTQAFoAO58bKIbgAZgADDAsABKaGw5awFksr4-KB-QFQDCaDYwdlw2CI5HfdFXCAYLE4vEEokk9aU6mEWkANiZrPFnJg3KUOz2Fnibw58KJdGi9DCSXGUyUISWVtgRP4XR6-UG9tGTqe-2qMM6iXcPOUaF23p0jHx3G0cCGcC4lmmEquHN6EGoXT9w2ILts8QASvAU2nEe6roDqvtiBM0OzqgADJTcGqxNiPWkOKJFWG0KB8bhRCEwTg2VbaNgAbg7Xc0Pc0ZM0GA4h1pdIHC7QnboUFitPHsCnw5gxFne87YHoxDJqYAXjBaQBGZk3hLCjbrd+fxdxzYDhNlpBl8FcZluA-LA91bfBgVBcFIXbfclxXPsB24NgQUYIkJnBCYv2qbtHjXDcIC3bgXF3RdD2PbgCN6WgvzvBhHwgF8+wZWi0KAkCNjA-AABYoLfCCXAAtB4KFEUYFQzsSOXXtuH7Qc4GHUdr0XJSV3Izc4FpAB2XiD2HBjtLQtiH2fV9VOE0yxw3AShO1MSRKk1tIyULB8CwWh9gYEkDFDRcpxgClaTAQLrHoYkWW4YBF07bRiH2TQ0KwQF5HZZBks7BJ-nLZNbDTCh8oKxLuHoagR2oABrWl-gSpF8VgOJAQACUsI9uGKytOBgABCNIEs8CqCrSfrSsGqAM0NIkqWyE5zlGiqAF1I07dwlAjJQzFtKJoEePBqgwapLDMCwrGIGw0DsEA3wZRAGQ8LwQEwHA8HwagmgO+8wjwDx1vcIA)

Preconfigured media querie groupers for BSS are available in [the `stylething/bssHelpers` module](lib/bssHelpers.js). The following examples illustrates how to activate Stylething helpers:

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
A live example [is available here](https://flems.io/#0=N4Igxg9gdgzhA2BTEAucD4EMAONEBMQAaEAMwEskZUBtUKTAW2TQDoALAF0fmPSk6IBqECAC+RekxYhWAK2olIAoZxHlG2CACdOAAkZ7S2iIYDkjcp3bbKAASiIAHpzMAdKBq269AIyMm5r4wMO6emjr6wHpg2oiYggDCplqOAgBimGCcOgCeemIBpnpmMJy5SNbkUADmYV6RetG+OviI2gBKmPjkAK4wRH6t7QMxCDqDpNCcAMrkAF6IgzDYWYgFReYwuWWIjFW1YR4A9Md6ePq92OflSPhjEWn6pFk52rkeymU3FQR6ALwxOIJRDJR6qTLZPIACl8g2ihjEAEoPCczrF4oI9Jg9HEVtAYOQAG6IeD5Mq-e5lBLkMAPVKqT4E-QdRD42DE9aAil3aFmXy9Tg5KBmQYtbRtTrdPqjcWS0aQeATIzTOaLZarMCIFFQJmwfQ4a6A6JE8iIADuKD00KRAIAfB49AY+T0iaK9DRHU7naz2YSSfCvd69Kc9OxMBLIG17nL2no2qRsbEICEDL14JxyNgkH5gQBrLTVTgwIPe2PaK00EoAJmwTnOCHI91WSFNCEQnDi+HdZlr9fwECFfxyjASEB7fYb8CbuIIZj0AF0iKWnaHw5GINGhhK49ppeQkyZU4x05ns+tfPnCwIS1Bg07y10ev1KyUAMx1nsAVk-gzMAHZP0XZc73vNcI3wKM-kVHRDxTGA0wzLMc0veICwgItb3vMYlQrD0ShbRA20qLsexHMce1I4CVxDM4pgENV1iJTB4F6Nk9GgPRrHWBNMFPLjci0Go92wdhaXOMAWPWLIjwQk8kPPXM0OvYsaPo2YFkQV9q0GN9BgAFmo0Dg3Ajct1WfAelqODj1PZCLyvDCbxoiyrJqV8zAABlYasvz2PQAEY9h7bz9P8gKfL8xgQtYAA2cLWDC6KjOw0z7ig+4oE4vFUn9dZR20Gpqiw+8CqKqArTMILopA1L0RSaBVD0IimvDKB8CQbQaOgMBpzAPMrRte1sU6zg+XNHQ81CHVgwkEoADV2nyHKCU5MwZsXHUxFRKBGFYRgIF6ARoQHMBemYARWBafBckGQ0dT4SBNEodoRF8TBfFJPg8CQbJyAJEQAurFAgfESQQAYZgRFYMAQke6ZVBEcQlxAacoCm2gpChtBtl2fYxNqPhem0Xg0C4ThcBQU4juwPMahh0xjlxwR8eqGo7Ai-99NYTzjh6MomZ2FmDnphQ+HKbAZBgWIszUMQFzEIA).

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

Live example [is availabe here](https://flems.io/#0=N4IgtglgJlA2CmIBcAWAnAOgBwGYA0IAhgK4AuA9gEryzmFTIBmhsAzvAYxAq8gNqgAdoTCIkIDAAtSYWCAIBjcoNLwVyECAC+eISLESAVr0XLV68RDAAHcgCdSAAjCPGd8i4DkkUpLvcAAUF4AA9STwAdQStbB0cAI1d3L3jWVkjom3snYEcFO3hCVQBhD1tglQAxQgUKOwBPRy0kj0dPVlJ6hF8IQQBzDJjsx1z4+yh4O0p6CGJWPATxyfm88lo7BcYzAGUIAC8OR1ZrGvgmlq9Weo74MB7+jKiAeie8udbfW-gopUEOx2CAHcACqSL6OAC8IyijgSBUIAGtbL1SKwkI4+G0cAAmW6eBaeFBYPEEgBsKDxjgAungYUcTgp4OjMQAGBakhYARmxXKwC2xKGptMEsK2Kl2BzRGMc3K5HJlfMcAoWOHlAHZsUK6XYZhBmY58I4AKwLNU0ulKdZS4B02HxWDEJltADELLVCnxtscfQKanRnmdnIULM9Ith3p19WZAYUsfxLqNic8VLpWiiacEz1e7CcxGsbw6HzBoigR06CFLSiyFSczFq9nqP2U-w6XXgpah+UKqm25cmAAp4gtcmAFp9ROigaDwVoAJRRLN5eGqRyERwFY7NiAANxojVbFdW1bUpAWgIgvkcUHqwkgCjLbcc9QgNCgvT6rmIggUrCbfycABCZAUCKUIHu2-aePEwHKPG8QAAZ0vE94+vAjZhvegKSBe3xhvm3JKigdKMKwMqknSpC5tY1iTAohDsEhSx2ACyi4XazE4HSkCCAAtOeUCXtyLIWsQdisPYjjIiokwUTqfwXhAyiOCyGA4I4pByawWx2KOymqY45AMhe6F2qRLIykq659PEhD9myykLPZqlGvOYZ8fA8QIhePFiqQPGsGA5DkPcfTooQKgQCwkXsFAADcUTwRgAAkkjkLudiIWGGnhVp9guNlfywEU8AAJr9jxnLWCErmitwqjMfE-h9NIwRpP2nI4CyACkNUJGZFlGlZNl2Y5o2OM5rmJUlNSkDu8CZbVsD1XCEDNaQrWsO1LLdb1BW5Tp6maUVqhlSyvVcEtkyOEh-WcspQ22fZT0LBNCULGMdgTFMMxzO9TErJa9ibDs+yHMcpyuX+-wAILUZCIyONuL6Aui-azpCAB8XGQW+27xnwXpgP2QGUcow5enaNQIj65BflApTrNGFBgEU5Dxp4qgsOzJwIEjazwBp7bJsK4bhi8jiSIQn1KBMpYfV9V7wIwq75OQaTOMQS0QNYCBwoUSLkCiv5hqL8uTPqnjYlVRxrNAkksPAfPdAUUDs1bIRXsFqilszrNu9b4mwHbLueFqJti6847tosn1XTqb4QI4-ZRxg8cQBA6M1O46tgJrs062cjX61JqIUzHX3TG+cz6vZnL8mHouwuLkvS+QsurOsKvZ6RudawXeuIiXxuNx39gW-ajrs6hahT5GGAhg3jfi75EpnNuLCOqRSkKHMzPqfUtg+oQ1jYferB0bryfFvAGAr6DrCZ6rOd59rutF4PhsqMPjd3wc+o8gaBYgpzThybpHa+pZ0qzQvquQQpZUr+D2GYFg9sYDviTincGjJH7dw1n3N+8IDZGzLtYKM0o65KhVIvUWVULachJG0TkGBsRGgYZ4JhFIwChxASPZuUtKxt2joIJSG5yisDms4KWfRejf1FizOw0jBD+noVwkWS9XhVnKCeRwjttGSzgQgOwZdlAKCDgoBEqN0YQgxquQxpBIIAAkaC0EcNUb8jRqCbnkruRwAARG8IgIAel6rCHQbQABqkxGiiK3D4gAZFeAJd5PC9SpK5DMUQwAYECl+exUByA71ECoDAYxrwLFhtYVy8gQCaO4JMDQNl4g0GqewBAtRFJ-A0KSUkqBtC6BALeAwGAfwmBqWYE8GhtBUi0EAA)

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
