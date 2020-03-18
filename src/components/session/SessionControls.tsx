import React, { FunctionComponent } from 'react'
import { Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { StopVotingButton } from '~components/session/StopVotingButton'
import { StartVotingButton } from '~components/session/StartVotingButton'

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
  votingStarted: boolean
}

export const SessionControls: FunctionComponent<Props> = ({ sessionID, votingStarted }) => {
  const classes = useStyles()

  return (
    <Grid container item spacing={2}>
      <Grid item>
        {votingStarted ? <StopVotingButton sessionID={sessionID} /> : <StartVotingButton sessionID={sessionID} />}
      </Grid>
      <Grid item>
        <Button className={classes.controlButton}>Edit Reviewing Issue</Button>
      </Grid>
    </Grid>
  )
}
