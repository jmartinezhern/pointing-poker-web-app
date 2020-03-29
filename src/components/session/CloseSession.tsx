import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { Backdrop, Button, CircularProgress, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useCloseSessionMutation } from '~generated/graphql'
import { useSession } from '~components/session/SessionProvider'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
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
      <Backdrop className={classes.backdrop} open={loading} timeout={500}>
        <CircularProgress />
      </Backdrop>
    </Grid>
  )
}
