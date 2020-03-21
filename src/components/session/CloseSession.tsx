import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, CircularProgress, Fade, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useCloseSessionMutation } from '~generated/graphql'
import { useSession } from '~components/session/SessionProvider'

const useStyles = makeStyles(theme => ({
  closeSessionButton: {
    backgroundColor: theme.palette.warning.main,
    foregroundColor: theme.palette.warning.contrastText,
  },
}))

export const CloseSession: FunctionComponent = () => {
  const { id: sessionID } = useSession()

  const history = useHistory()

  const classes = useStyles()

  const [closeSessionMutation, { loading }] = useCloseSessionMutation()

  return (
    <Grid container item justify="flex-end">
      <Grid item>
        <Fade in={loading}>
          <CircularProgress />
        </Fade>
      </Grid>
      <Grid item>
        <Button
          className={classes.closeSessionButton}
          onClick={async () => {
            await closeSessionMutation({
              variables: {
                sessionID,
              },
            })

            localStorage.removeItem(sessionID)

            history.push('/')
          }}
        >
          Close Session
        </Button>
      </Grid>
    </Grid>
  )
}
