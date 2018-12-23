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

A live example [is available here](https://flems.io/#0=N4IgtglgJlA2CmIBcBWAzAOjQdgDQgDMIEBnZAbVADsBDMRJEDACwBcxYR8BjAeytbwByEAB4oEAG4ACaAF4AOuAAiUpQD5RAegmT1CqgfFTZURSABO8Gt1arJG7bvVcQJeAlsR+ZRgCYkPxQQAF9cajoGJgArMh5+QWFGPioSVmlgaW4rGkEAZVYATwQLaRDpOWk04vhWZggqAHMDFLSqooQoCqyc-I74CwAKACNcDOkwMoBKFp90gAVYGgaAIQBXVlZ+burOwYByYY2tqn2ZwyowDDBeNYFBsHsx4ANpaUkIeAB3JGkCO6820GUwyrze0isrDWFiobzAB10+zG5DB4ImB2YAEYkdJ9gAJDywXjSACyEDqFmIZ1wqPB8MWyyo602-BpsLR4MywxsAGtGhZblQoL99qwLDRUgAHGhWARI2kc6TDXgWKADABKNAkaxIIrQkoAHvL2Yq3srVQMRX5DVVeLBoNJpQgPnbalYoMbTeC+ESLCKnfAXQgxfAPWyvXCZY0GiKAAzSTHwMCeiPSmANRpxjBBJMJpMpr38bj27g837AirqaQ0EqsA4E2BE6TzBo8wqk8nMSmwACEZzK4dN+wAwiWeaT4GcFdIALrnN4hAwhc6zVLpdXdbLWPo1Iajcbq6y2Ma3ViSjYAFUKkvgIuLNBIJH201XbQZDUPNlYzJO3XVByOFlThXKhP1sZQAHkSQwWU1SGMFjAcE0siWR8ADlIjkYBhgAAzAdI0CTHCMHvR8Qn0ZDRCxdQGybMDWB7bRqNpUR31Ao9v2Ofhp25Ut+UFMxgFFcUpRlIRWH2RdkLNFU4M1bUSCw-Z9SNKTFXNOClOtA1bXtLoAyDN1Q0k6cfRVJSDO8YN3RM6SJijBolPjRNkzUjk0wkJonOzFBcxc2zFX4UcIFLLCKzkKsawGOt8UJYkWyoNtpHovspnI6dgtLCcexYrQ2Pon9+Aot4nCkCixhycCpCmVw+DASViAGERuWGDxXHcTxWG8VIRExTEkAAFgG0JwhAWh6BEEjH1qhJxJEUIZ3we1Et8SgxsiERKtYDA1UkDxeElegBAwWJXGhThGDYM9dS0LQ7klPkSN4MAtC2u6wCgV6OJ2wN9sO8STriEAihvEQSGyCBJVYEaIgmxgtoAWigZ6fr2ol-uO078HOkQrslG67qoB7Giel7EeRl61g+r6vyRlHdr+o7tqx4HryicHKShmH1rh8BO27M6LAukA8YJ+7HrqrRIApYgAAFMQwBWADYpf54hAdcEH2YhrmwlhqJhmm7GhdxzZ8aQW7xZJyXDZIeWMBQDBYy0W2NfwLWwZ16G9Z59n+jqDNBeF0WLcJ4nSa0XZanqJp7b8J2dAgNJI-9mOSZZj3GA5yHvZnEIgA).

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
A live example [is available here](https://flems.io/#0=N4IgtglgJlA2CmIBcAWAbAOgJwA4A0IAZhAgM7IDaoAdgIZiJIgYAWALmLCAQMYD21NvEHIQAHigQAbgAJoAXgA64ACLTlAPjEB6SVI2LqhidLlQlIAE7xaPNmqmadejdxCl4COxAHkmAJiR-AFYQAF88GnpGZgArcl4BIREmfmpSNhlgGR5rWiEAZTYATwRLGTCZeRkM0vg2FghqAHNDNIyakoQoKpy8wq74SwAKACM8LJkwCoBKQzbfTIAFWFomgCEAVzY2AV7a7uGAclHt3eojieBDGRlR2wBrZss+TeooJBkjtktadIAHWjWQSXG53PiWKBDABKtEkm1InyOAGZ-gAPUHUW6jCFQyxI-zomp8WDQGSAhBSHwIH7wKCY278WAQpEU+BUkn1az0vBgsBA5pNJEABhkAEZ4GAGeS4ZIWiKMCFJeLJZiwnMjNR2pkAGJ-HjFLY7PbVA5046nY0XCajAAGYNGPBkz3gxTBToA7o0hGD-uL-DJ-CgwYRSOK0GCdjJNv9-kMeLQPA7cUMZNQBPAHeVkXymgBaD3QBr+4XuzaWUgQ8l8JpCSyR37pCBsHxY4UYZEyH5-UiECFgCbtzt8QE8ZturF3MOisWBmSWZr3YbCvArlcd4Ia24F+CjB7NvN9wR50hgPh8BpNZqfP4t2ikxN0gDchltGAAJCw+FIhvbJ930j7SxpgA0hViEABNYY8zFdEtxkYhYDrO5LAgZp2GoeBSFIYYxWRYUAFJ4NGadxRkYJ50XWhl1XWiNw1N931sFsfz-W5EOQ0ZUPQthMOw3DhUI+DQKAkDGzA-J4Cg4V4I41MHVI2dRQXJc1zo5FN1fDVDG0bQZB1eBPCvGQ4R-QRy1eUgAH4FnSTIhHvAB5SwABU+H5XZegAWXyFgMEbKB3OGGYZA0GR2woqyvgc2AjhkJFdg8vgjnmagwAwM83jYYYwAcK4wSpeAPU+Qg3m8PZgqyMFbmsNhy0nMBjj0S4ZAoVLbg6qZhhWNZqCNc5eUnTrbmyAQeFJHgHk+Sr5DC+8hmyo4AAlPGZGQliaB5ihkLzmxYVDYAAQiOEKImq4ajgAYQmh4dvgE7BvO25Gr1LVDTOARBuGyZ7km55XneS6SRZLsbFgZy3KSr7vpkMabumkLZpMspFpW2A1teg1jtO6HOqOLz4C7c9sfajqAF14LCQx1UMNx+DAf4SCGUR7lGTw3A8LwW18UQxTFJBhXCSIQDoBhRAwHhsLppJhDYURwjJghSWoB4-CoEXolESAGgOtxyy4Jh2DYf5EV0t5-ieCX3O0bX9pIAABMUMCdtAbb2g6MHiNwSjjURSFyCB-jliIojFpgSISEB9dEI2TaQM3qAt5orbAbQI8djBggwYU0+wz3I59mJ-dQoOhdDovBkvFo9csA2QFj03tHNy36e0M0q+aDP-Gz3QIAyNvK8aFp8+94pfaYYvA+DsmwiAA).

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

A live example [is available here](https://flems.io/#0=N4IgtglgJlA2CmIBcBWAjAOgOwBoQDMIEBnZAbVADsBDMRJEDACwBcxYQ8BjAe0pfj9kIADxQIANwAE0ALwAdcABFJigHwiA9OIlr5lfWMkyoCkACd41LixUT1WnWs4hi8BDYh9SDAExJfFBAAXxwqWnpGACtSbj4BIQZeSmIWKWApLktqAQBlFgBPBHMpYKlZKVSi+BYmCEoAc31k1MrChChyzOy89vhzAAoAIxx0qTBSgEp9fU1NKQAVJngpACEAVxYWPil8cx4J2pXYala3Tx2Adwhank2pI5l+foAHHhOWLxTm7zT86koUGo5igGy2OwqVQ6AwA5ENNttKDDRkMAAb6KSZd48cxIKQvagICReBAsSxQADcGN28QAtMQIAAveB4tDwMBUyiYsDAhr1VnszmYgkweoNPEABgwgXZUjZHOpQxxUH6eN8LwAHpV3tB8YT4MT3jVyUKpEqQf1aeZqOJ1sQ8QBmTUU1HTAyUOZSACCUko8EuWLAbz9-DNp3gnR2-0BwNBCL4KPu11q2roUh4En65mgKyh8GIPxSaQWBxyPDBiK6eagA2jQJBFYTZvRXL1osakowKFlmG7CtbvFgOLx2x521N5pV5lpg+HD1L49dM0oYAwYDu-AGYDso2A1OJ-rx+HWlAuXIGk3S1MxlhY63MrbAsJ0yKkZGXmM-41rLAB9bj4KUDg15fmMfBcLAEBcAA1niF7lGoUj6uYLCwgAEu4Q5SHWsYAIQwpeoQgV+MIAMKQTBUgALLwARwHuqB34lmO5bxkBxGfhk4EUbBUjwbIiHIahMIYbAWHMWW+GEfRjGYjCNHzjwUkyaBHFPjhDZsSpjEZKceIwtQyIcV++DxAAYrQRAFPpxAAsQ9L9BA+BGa2slSEwlj4EgMIAMQuW5mLcVBvH8YJxTCaJWEaZ0pxSAAMvU0FSaU2mgTCXrEFIkGUElBEgQAum6mLBPowRui4vBBkQ-TCEM1BDO4LhuB4nzeMIDooEgAAcIRhCANB0MIGBcMQsQgMkCQsMIIT5Xg2XQT4FD9REwiQLU2YcHg94cAwrAsC89pzCeLzQQ0w0HJoa0eUQAACmCYAAbJdNzXbAGAxC4hQvJExBZBALxTaE4SDQwQyjS423CHtB1IEdlAnWdlWaGDxB3V2GASsjo3vWNX0-X9AO9cDP19LUYoQ+YO0gNDh2aMdp3nWAmh5mTjRo74GPaBAqTM6TdSNDjn0FN9wi-dmhPBPlwRAA)


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
A live example [is available here](https://flems.io/#0=N4IgtglgJlA2CmIBcAWAHAOgAwGYA0IAxgPYB2AzsQskVbAIYAO58UIBAZhAucgNqhS9MIiQgMACwAuYWO1qkp8RTQA8UCADcABNAC8AHXAARLUYB8qgPQbN5g6QfqtuqIZAAnePUJTTmi2tbc3kWBF8IMl4xACYkGIBWEABfPEFhUXEAK14CEkVlKRp88iltYG1CL3olAGUpAE8ED21k7T1tUqb4KQkIUgBzBwcrK20AVxZtACFa2u0RDXptAEdx+A8G7QGPYnHGDfIHACNJeFgDjwAKAHJSYilasHpYWBu8TsaEdvNtU4ASRYQei3chVeDKbT0UhQbRXSCkAC0AHdoL0kNocFh4GAAJTvT7dXG4k5nC4bW4MDwDeAErrfPS-AFAkE3MFeSHQ2Hw-ootESDEANmxeLpX3gxOGpFGnR6E0YhIQsJIYEYZEK2g4PikxE2DhKZXprHalWqdXF12OHwqYFaJMc0rG4Jq8Ch2i85DVFC05y2RthpRqEEIlWIqvVin1UTKACV4J6oj6Tf7bsdxlIdaQCccAAYObR-XVQDYYmKMAAenSo0G0jBe8E0kQQUi8UAA3PnCx5ix5ER56BpJhicBWO6QCyRYLqMXWEI2qD1W2OCxwyFJEeQIAAveAYgCMOOXC3o1P6+8PnbrMH6AwxWAwiRx2gPYDHOYw90ez1eefHXZ7pYVtoUAPEosI6s8OpHscRYbH2A4QEO2gJKOnaTtO2gQTUxBHquigbtuu7aDEWCoX+V4aIMd4YCgT57g+CQXqQ75UjSv4FjB3YlsRQGULANZLp2nE9vBg7kBiADsZETlQGGCX+eHrpuO6lig0m1gOlG3to96CnRNFMTm9oOGAGBgHsijwv41qdo28DIhiHDjKQERkHCuLlJ2BZeFI4weH+YC3LYBJ8F5BYLFccYJt6mjwHgYXheU2hkIQ-GEAA1hiVweYyULNFItwABLnFO2hRV6m6xQAhDcHmpAl4U3OViaxbAfrirCqK9DMcy1QlAC69oFskDjJPa8gqow3AbDQxz0Mc5yhOc8CuRQNAAJyoGgiKbVgKRpCAQgiDQGCEOQuQKEoKhiCk-UEPxpDpdEAiHRkNCQL0HjcPIflyGI0hSMwSCjM5jDpQMp1hlYH0SF9sAAAL0fRgrQxAn3cBgOTyI0Bw0OyECMEUqTpMdYjHOdP0eH9IAA0DIOkGDEMqlY5PkIjGAJNgLPnZjF045k+OE-tJMC+KvQ3pT1O0+J9OM5DYBWEa4uDOzMRcxopSK2LfSDLz2MNLjYiC0T-XJEAA)

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
A live example [is available here](https://flems.io/#0=N4IgtglgJlA2CmIBcBWATAOgOxYDQgGMB7AOwGciFlDLYBDABzPihHwDMIEzkBtUEnTCIkIDAAsALmFhsaJSfAXUAPFAgA3AATQAvAB1wAEU2GAfCoD06jWf0l7azTqgGQAJ3h0CkkxvNWNmZyzAg+EKQ8omhIaCggAL64AkIiYgBWPPjECkqS1DlkklrAWgBGRO5Q8O4ASnTqAK5kuOWV1e4tWsSwla3spJIAyhAAXvCtZAze8FoJWrpaZACeRfBgkuIQJADm9oXFpQSedIpDkssI7nMLSxcIm9t7DiSWlkvwxY0Md5cs3UQwAxSHktOxvJJKst9pFikU-lBbscvGd7jUABRlVqlMBzACU9nsb26J0UWjoWk8U0imngsGWvwQiKKpwgBABQJBChh5GKtXg1PItNu8KZ6IA5GVGpJISRxa02lUavUml0KkrOq0en0wYMRuNJtMCPACSQwBgwERGgp0WA-Nj7FotBoIPAAO5IMHW8KkLTovElR1OymfRruEhOsASmzyrS8QkR4OR9H8wVkWkOxNJp3E8R0KrEaqI9UdLTVdjk45EMhkLRgRqwSQQBgIconADWwO2kjIQezio6nt4WnFaAYAA8lpRoFppggXZRPp4oLHRxOy0QZf9IWBTkRV2PJxRYDPl+KtABdXB97O5-NQQv-Es1SkNCAQSvuau1+uN5utsoOy7BReyzbNnzqN9miHEcAGYJ1XFAENacUsAQy9rzApM7wLIgiwBXprm8L8azrBsmxbWZAK8TsiG7UD+ydbV3Bg8U53gBcHjPFCdz3Vczwwm9sPeAYFH1WYNDoWBGgFLRfU2WZyzocitAuYEdncRgtnZMgCCk2ZiO-Mi-0otsaOAnshODUThjGeAYLQVpYNaAAWQSsODHCHzw-5phgJ5PyM38KIAoC6JAqynT89RdlYgAGDA4nWLQAEZ1lXBKXOSlLEpQdKUISgA2bKMCysBzyvSKtC8gF8JIX0qWBIUNFmXd3B2bYGMYtqOpIT1xTS8rMMY6r3mITkSFBDjQTzEg4BqKrSAIE8CHbT1-QWMxySuSQJTdSp2zIcVTX7JIRwANRqBlGppFrjoTJMLxOuZ7ASU05HGhguBqagyjoMo6RCOl4B9chqDQAAOJA4sSZIQEEYRqAwAgaw+wY8moRIrxAE8SEOvgUkR0RIE2dwuDkMNZFEKRJCYJA3mtBh2x2ZHAUsEnxDJ2AAAEcpywr2YgUmuAwTI5DUtJdLJhh8iSQm0jKVH8Ep6gabphmSCZlnxssRWyF5jAUAwOLdZrUWshACXqCl5tZbhhHJdWRQNi2XYKfcKmQDVsh6csRnmdZsBLBWNYXaeA2sBc43rAgIpg6d9ZHl2c3xeWBhJeOW3Yfl620STnZ3c973ff97W2dFT5XZ2A3MBN9Q44r-OU-wK3RBtmWsYSIA).

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

Live example [is availabe here](https://flems.io/#0=N4IgtglgJlA2CmIBcAWAnAOgBwGYA0IAhgK4AuA9gEryzmFTIBmhsAzvAYxAq8gNqgAdoTCIkIDAAtSYWCAIBjcoNLwVyEAB4oEAG4ACaAF4AOuAAieswD5NAeh27rJwS+17DUUyABO8Qgqklro29o7W8iDsCIEQyrziAExIiQCsIAC+eEIiYhIAVryKyqrq4kqCrKT6wPoARuQ+UPA+lPQQxKx49Y3NPl36SrQ+3YwlAMoQAF4c+qwADgHw+hn6RnMAnlXwYKSSEIIA5i4VVTWDfoSq46QbCD4ra3O3CHsHx66CdnaDneRg+j2O3gJ3i1UE8AA7gAVSTAp7AFz6eqXADW83IB1IrCQ+j4+gA5DhEjsCd0CSgsKTyQA2FCk-QAXTwSLmiwU8Fx+IADN0ad0AIyJQVYbqJFBMlmCZFjFSTGY4vH6IWC-nK0X6cXdHBqgDsiUlrJ87QgXP0+H0qW6uuZrKGjUViOlyPqsGInMJAGJubqFGTWcjDn41LiCZ6BQpuf7nYHjRsuWGFEmyV7UmmCYzWRkXNnPt85vBqsR5r8qv9AXDRFBnnd4NWlGAMRCVPpmIFGhtQZVqlVa9X1gpLtcXi0ABR1bq1MDdIGiXEQmGV5YZACULhc+cH-lU+kI+j8C3iehoGxrCHr-ybalI3UhED2+igG2EkAUZ+WGwgNB0R1bxEECisF2ZwAEJkBQ0rrL256jgSdTgcoKZ1AABqydRvkG8Cds6b6QvsqisiWQqaigrKMKwyo0qypBFvM8wtAohDsGhvQtPogjKCCzp1A8OCspAggALR3lAD5CtydrEP0jT6BiWItNRxqVPecTStyGA4ICSmsGMPjTvo6maeQ7L3thyJ1BR3LKpq+6HHUhCjryBndE5GmpGuzrCfAdSovegmyqQgmsGA5DkG8Ry4oQKgQCwMXsFAADcLjIRgAAkkjkLoLSoc6pDabpAJ5VFrCwFc8AAJqjoJArzAAHh5MrcKoDw8RAhzSBCrCsKOAo4NyACkDX1JZ1mpLZ9mOS5U36G5HkpalASkMeOWNbAzUom1HXwF1PXcgNQ1FZUBVacVpWqJV3JDVwa1sWhI0CgZ40OU5L3dLNyXdA0TQtG0OidJ9rH9N09ojK2EzTLMCxLB5LhgBgIX-qQo5gMEk6sroX6QrijD-rEyj6KOK41AG+6FlJzpgLBjgpnwJPInT+iU2BNHKGjMYuuZASokG5D-lAADC5DDAmFBgFc5ApgSqgsJLiwIBjQuFn4UAZlKHMc-mkiEE0SjNNWX19I+8CMLug7kF1jPEGtEDzAgKL+OimIqEB7McwbLRmgSiR1XMQvQLJLDwArrzK5L3u1Y+YWqNWovi2HPusH71ah4arsuvms51j030PMaOgQATmcYHnEAQETAQ+ObFFgFbS228sPEO3JzsM+ZgO-R0io8oKYqp+r6c-FrOvkHrgxCzJFdV5b1v1-bhCO1iLv98iIOe3UbrwJLmFqFvcYYFGffL-mAXyssugsO6FH4wonSi4CGwYkGhDzPsb6sIxdujkXJ8Q6w5dmxbGuM87aN3ns3bErcwZyghmaYU5pugSltGnZEGclzViyj4JaH9dyCGrBlHw0wSgsADjAd4hclwYChhyf+ldAG1xtiAtE4Cl7L3mPGJUAoxTakPv3OqnsBTUkJAKDAaRBEEmEfSMABIeHq01trC8o8OLSgPE2Vgx5Gba0OAcFh-cxY+C0YIUMAipFqyPj8BsV4WxB2vPoLWuD7iQOUAoWAEAFColxITNY1hdz3CRgSAAEjQWg+gABiUUFCnmoIeZSWV9DmGfCIVxBIhocyyISAAai0U8KijyxIAGSPgSa+ZJJNGRDVzKuFwkQLHcBaBoeydQaCRGiPAPGlQNACiwEgbkmRsggBfHkDAgEiggAqKUUgGhMjMhAC4wQqIEgCH6bkDQkA9gELkAQKSchxDSFIPMHE3x-zzG5kM-4dhVmSHWQAAWEcImk5z7yXO4BgQokRbj0Q0O-Ah8wJlZByKIepXVIhbI0Ls-ZSBDmCGOYcU5YA7AWVYDcjAqR97wq6i8kZ7y8hfJtr8vpAzPlbFULsfYRxgU+G2SAMFBy7BHJOQ2OwrAiU7HCocJFuoUCop0FURlzKSXvAxW8h+2LBy4t6f87FI5WXkspdSiFtKoX0rOdBQspK2XCMSFyiAPKVWssFQQLFnzRU-KmRkIAA)

An example theme with preset values can be obtained from the [the `stylething/theme` module](lib/bssHelpers.js).

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

[MIT License](LICENSE)
