import React from 'react'
import { render } from 'react-dom'
import AutoSizeBackground from '../../src/'
import img from '../../src/screen_bg.jpg'

const App = () => (
  <AutoSizeBackground src={img} />
)

render(<App />, document.getElementById('root'))