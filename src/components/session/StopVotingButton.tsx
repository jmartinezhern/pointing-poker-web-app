import React, { FunctionComponent } from 'react'
import { Button, Grid, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

import { useStopVotingMutation } from '~generated/graphql'

const useStyles = makeStyles(theme => ({
  controlButton: {
    backgroundColor: theme.palette.primary.main,
    foregroundColor: theme.palette.primary.contrastText,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

interface Props {
  sessionID: string
}

export const StopVotingButton: FunctionComponent<Props> = ({ sessionID }) => {
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
