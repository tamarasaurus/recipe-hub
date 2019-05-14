import React from 'react'
import ReactDOM from 'react-dom'
import { Global, css } from '@emotion/core'

import { ThemeProvider } from 'emotion-theming'
import App from './App'

import * as serviceWorker from './serviceWorker'

const colors = {
  black: '#000',
  white: '#fff',
  gray: {
    s: '#f5f5f5',
    m: '#ddd',
    l: '#222',
  },
  accent: '#0bad72',
}
const breakpoints = {
  m: '800px',
  l: '1200px',
}
const theme = {
  colors,
  px: (...values) => values.map((value) => 8 * value + 'px').join(' '),
  radius: '5px',
  border: {
    s: `1px solid ${colors.gray.l}`,
    m: `2px solid ${colors.gray.l}`,
    l: `4px solid ${colors.gray.l}`,
  },
  breakpoints,
  mediaQueries: {
    m: `@media (min-width: ${breakpoints.m})`,
    l: `@media (min-width: ${breakpoints.l})`,
  },
  transition: '200ms',
}

const globalStyle = css`
  html {
    box-sizing: border-box;
  }

  *,
  ::before,
  ::after {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    font-family: sans-serif;
  }

  button {
    appearance: none;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
  }

  :focus {
    outline: ${colors.accent} auto 5px;
  }
`

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Global styles={globalStyle} />
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
