import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme, CssBaseline } from '@material-ui/core'

// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /.stories.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

const defaultTheme = createMuiTheme()

// wrap all stories in the common application wrapper for mui
addDecorator(story => (
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    {story()}
  </ThemeProvider>
))

configure(loadStories, module)
