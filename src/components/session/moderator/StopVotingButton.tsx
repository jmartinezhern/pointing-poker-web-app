import React, { FunctionComponent } from 'react'
import { Button, CircularProgress, Grid, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

import { useStopVotingMutation } from '~generated/graphql'
import { useSession } from '~components/core/SessionProvider'

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
        {loading ? <CircularProgress size={22} /> : 'Stop Voting'}
      </Button>
      <Snackbar open={error !== undefined} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error">{error?.message ?? 'Failed to stop voting'}</Alert>
      </Snackbar>
    </Grid>
  )
}
