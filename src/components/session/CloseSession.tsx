import React, { FunctionComponent } from 'react'
import { Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useCloseSessionMutation } from '~generated/graphql'

interface Props {
  sessionID: string
}

const useStyles = makeStyles(theme => ({
  closeSessionButton: {
    backgroundColor: theme.palette.warning.main,
    foregroundColor: theme.palette.warning.contrastText,
  },
}))

export const CloseSession: FunctionComponent<Props> = ({ sessionID }) => {
  const classes = useStyles()

  const [closeSessionMutation] = useCloseSessionMutation()

  return (
    <Grid>
      <Button
        className={classes.closeSessionButton}
        onClick={async () => {
          await closeSessionMutation({
            variables: {
              sessionID,
            },
          })

          localStorage.removeItem(sessionID)

          window.location.replace('http://localhost:1234')
        }}
      >
        Close Session
      </Button>
    </Grid>
  )
}
