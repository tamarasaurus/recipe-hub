import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components/macro'

import App from './App'

const darkColors = {
  base3: '#073642',
  base2: '#002b36',
  base1: '#586e75',
  base0: '#839496',
}

const lightColors = {
  base3: '#fdf6e3',
  base2: '#eee8d5',
  base1: '#93a1a1',
  base0: '#657b83',
}

const accentColors = {
  accent: '#268bd2',
  warning: '#dc322f',
}

const breakpoints = {
  m: '800px',
  l: '1200px',
}

const theme = {
  accentColors,
  darkColors,
  lightColors,
  px: (...values) => values.map((value) => 8 * value + 'px').join(' '),
  radius: '4px',
  imageHeight: 230,
  lineHeight: 1.2,
  breakpoints,
  mediaQueries: {
    m: `@media (min-width: ${breakpoints.m})`,
    l: `@media (min-width: ${breakpoints.l})`,
  },
  transition: '200ms',
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
)
