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
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
}
const theme = {
  colors,
  px: (...values) => values.map((value) => 8 * value + 'px').join(' '),
  radius: '3px',
  border: `1px solid ${colors.gray[400]}`,
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
