import React from 'react'
import ReactDOM from 'react-dom'

import { ThemeProvider } from 'emotion-theming'
import App from './App'

import * as serviceWorker from './serviceWorker'

import './index.css'

const colors = {
  black: '#000',
  white: '#fff',
  gray: {
    s: '#f5f5f5',
    m: '#bdbdbd',
    l: '#212121',
  },
  accent: '#0bad72',
}
const theme = {
  colors,
  px: (...values) => values.map((value) => 8 * value + 'px').join(' '),
  radius: '5px',
  border: {
    m: `2px solid ${colors.gray.l}`,
    l: `4px solid ${colors.gray.l}`,
  },
  transition: '200ms',
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
