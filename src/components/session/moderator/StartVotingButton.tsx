import React, { FunctionComponent } from 'react'
import { Button, CircularProgress, Grid, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

import { useStartVotingMutation } from '~generated/graphql'
import { useSession } from '~components/core/SessionProvider'

const useStyles = makeStyles(theme => ({
  controlButton: {
    backgroundColor: theme.palette.info.main,
    foregroundColor: theme.palette.info.contrastText,
  },
}))

export const StartVotingButton: FunctionComponent = () => {
  const { id: sessionID } = useSession()

  const classes = useStyles()

  const [startVoting, { loading, error }] = useStartVotingMutation({
    variables: {
      sessionID,
    },
  })

  return (
    <Grid item>
      <Button
        className={classes.controlButton}
        onClick={async () => {
          await startVoting()
        }}
      >
        {loading ? <CircularProgress size={22} /> : 'Start Voting'}
      </Button>
      <Snackbar open={error !== undefined} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error">{error?.message ?? 'Failed to start voting'}</Alert>
      </Snackbar>
    </Grid>
  )
}
