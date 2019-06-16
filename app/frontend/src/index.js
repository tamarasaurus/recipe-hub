import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components/macro'

import App from './App'

const colors = {
  base3: '#ffffff',
  base2: '#e6ecf0',
  base1: '#dadada',
  base0: '#14171a',
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
  imageHeight: 230,
  lineHeight: 1.2,
  breakpoints,
  mediaQueries: {
    m: `@media (min-width: ${breakpoints.m})`,
    l: `@media (min-width: ${breakpoints.l})`,
  },
  borders: {
    s: `1px solid ${colors.base0}`,
    m: `2px solid ${colors.base0}`,
    l: `4px solid ${colors.base0}`,
  },
  transition: '200ms',
}

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    line-height: ${({ theme }) => theme.lineHeight};
  }

  *,
  ::before,
  ::after {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.base3};
    text-shadow: none;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    font-family: sans-serif;
    color: ${({ theme }) => theme.colors.base0};
  }

  button {
    appearance: none;
    border: none;
    background: none;
    text-align: left;
  }

  button,
  [role='button'] {
    cursor: pointer;
  }

  input {
    background: ${({ theme }) => theme.colors.base3};
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    transition: ${({ theme }) => theme.transition};
  }

  :focus {
    outline: ${({ theme }) => theme.colors.accent} auto 5px;
  }
`

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <App />
    </>
  </ThemeProvider>,
  document.getElementById('root'),
)
