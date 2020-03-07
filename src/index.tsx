import React from 'react'
import ReactDOM from 'react-dom'
import { CssBaseline, createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

import { StarterScreen } from '~components/starter/StarterScreen'

export const defaultTheme = createMuiTheme()

const Root = (
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    <StarterScreen />
  </ThemeProvider>
)

ReactDOM.render(Root, document.getElementById('app'))
