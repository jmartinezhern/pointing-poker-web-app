import React from 'react'
import ReactDOM from 'react-dom'
import { CssBaseline, createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

import { Session } from '~components/session/Session'
import { GraphQLProvider } from '~graphql/GraphQLProvider'

const defaultTheme = createMuiTheme()

const Root = (
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    <GraphQLProvider>
      <Session />
    </GraphQLProvider>
  </ThemeProvider>
)

ReactDOM.render(Root, document.getElementById('app'))
