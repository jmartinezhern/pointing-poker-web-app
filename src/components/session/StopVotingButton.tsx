import React, { FunctionComponent } from 'react'
import { Button, Grid, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

import { useStopVotingMutation } from '~generated/graphql'
import { useSession } from '~components/session/SessionProvider'

const useStyles = makeStyles(theme => ({
  controlButton: {
    backgroundColor: theme.palette.info.main,
    foregroundColor: theme.palette.info.contrastText,
  },
}))

export const StopVotingButton: FunctionComponent = () => {
  const { id: sessionID } = useSession()

  const classes = useStyles()

  const [stopVoting, { loading, error }] = useStopVotingMutation({
    variables: {
      sessionID,
    },
  })

  return (
    <Grid item>
      <Button
        className={classes.controlButton}
        onClick={async () => {
          await stopVoting()
        }}
      >
        Stop Voting
      </Button>
      <Snackbar open={loading} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="info">Voting is stopping</Alert>
      </Snackbar>
      <Snackbar open={error !== undefined} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error">{error?.message ?? 'Failed to stop voting'}</Alert>
      </Snackbar>
    </Grid>
  )
}
