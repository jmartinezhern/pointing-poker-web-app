import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CssBaseline, createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

import { StarterScreen } from '~components/starter/StarterScreen'
import { SessionProvider } from '~components/session/SessionProvider'
import { GraphQLProvider } from '~graphql/GraphQLProvider'
import { CreateSession } from '~components/create/CreateSession'

export const defaultTheme = createMuiTheme()

const Root = (
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    <GraphQLProvider>
      <Router>
        <Switch>
          <Route path="/create">
            <CreateSession />
          </Route>
          <Route path="/session">
            <Switch>
              <Route path="/session/:sessionID">
                <Suspense fallback={<div>Loading... </div>}>
                  <SessionProvider />
                </Suspense>
              </Route>
            </Switch>
          </Route>
          <Route path="/">
            <StarterScreen />
          </Route>
        </Switch>
      </Router>
    </GraphQLProvider>
  </ThemeProvider>
)

ReactDOM.render(Root, document.getElementById('app'))
