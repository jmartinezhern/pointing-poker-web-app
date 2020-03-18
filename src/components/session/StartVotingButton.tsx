import React, { FunctionComponent } from 'react'
import { Button, Grid, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

import { useStartVotingMutation } from '~generated/graphql'

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

export const StartVotingButton: FunctionComponent<Props> = ({ sessionID }) => {
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
        Start Voting
      </Button>
      <Snackbar open={loading} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="info">Voting is starting</Alert>
      </Snackbar>
      <Snackbar open={error !== undefined} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error">{error?.message ?? 'Failed to start voting'}</Alert>
      </Snackbar>
    </Grid>
  )
}
