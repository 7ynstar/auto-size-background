# Auto Size Background

Auto Size Background can set background image auto fit screen

# Example

[Click Me Open](https://7ynstar.github.io/auto-size-background/)

Stretch the webpage to see the effect

## Installation

```sh
npm i --save auto-size-background
```

Import the components you need, example:

```js
import React from 'react'
import AutoSizeBackground from 'auto-size-background'
import img from 'img-link-here'

export default props => {
  return (
    <AutoSizeBackground src={img}>
      {props.children}
    </AutoSizeBackground>
  )
}
```


### Run from local

```bash
$ npm install
$ npm start
```