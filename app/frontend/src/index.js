import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider, createGlobalStyle } from 'styled-components/macro'
import App from './App'

const colors = {
  black: '#000',
  white: '#fff',
  grays: {
    s: '#f5f5f5',
    m: '#dadada',
    l: '#222',
  },
  accent: '#0bad72',
  warning: '#ce0e0e',
}
const breakpoints = {
  m: '800px',
  l: '1200px',
}
const theme = {
  colors,
  px: (...values) => values.map((value) => 8 * value + 'px').join(' '),
  radius: '4px',
  borders: {
    s: `1px solid ${colors.grays.l}`,
    m: `2px solid ${colors.grays.l}`,
    l: `4px solid ${colors.grays.l}`,
  },
  imageHeight: 230,
  lineHeight: 1.2,
  breakpoints,
  mediaQueries: {
    m: `@media (min-width: ${breakpoints.m})`,
    l: `@media (min-width: ${breakpoints.l})`,
  },
  transition: '200ms',
}

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    line-height: ${theme.lineHeight};
  }

  *,
  ::before,
  ::after {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
  }

  ::selection {
    background: ${colors.accent};
    color: ${colors.white};
    text-shadow: none;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    font-family: sans-serif;
    color: ${colors.grays.l};
  }

  button,
  [role='button'] {
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
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>,
  document.getElementById('root'),
)
