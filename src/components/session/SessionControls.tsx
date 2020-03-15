import React, { FunctionComponent } from 'react'
import { Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useStartVotingMutation, useStopVotingMutation } from '~generated/graphql'

const useStyles = makeStyles(theme => ({
  controlButton: {
    backgroundColor: theme.palette.primary.main,
    foregroundColor: theme.palette.primary.contrastText,
  },
}))

interface Props {
  sessionID: string
  votingStarted: boolean
}

export const SessionControls: FunctionComponent<Props> = ({ sessionID, votingStarted }) => {
  const classes = useStyles()

  const [startVoting] = useStartVotingMutation({
    variables: {
      sessionID,
    },
  })

  const [stopVoting] = useStopVotingMutation({
    variables: {
      sessionID,
    },
  })

  return (
    <Grid container item spacing={2}>
      <Grid item>
        <Button
          className={classes.controlButton}
          onClick={async () => {
            await (votingStarted ? stopVoting() : startVoting())
          }}
        >
          {votingStarted ? 'Stop Voting' : 'Start Voting'}
        </Button>
      </Grid>
      <Grid item>
        <Button className={classes.controlButton}>Edit Reviewing Issue</Button>
      </Grid>
    </Grid>
  )
}
