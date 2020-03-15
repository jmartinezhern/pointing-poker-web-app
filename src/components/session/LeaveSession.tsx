import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, CircularProgress, Fade, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useLeaveSessionMutation } from '~generated/graphql'

interface Props {
  sessionID: string
  participantID: string
}

const useStyles = makeStyles(theme => ({
  leaveSessionButton: {
    backgroundColor: theme.palette.warning.main,
    foregroundColor: theme.palette.warning.contrastText,
  },
}))

export const LeaveSession: FunctionComponent<Props> = ({ sessionID, participantID }) => {
  const history = useHistory()

  const classes = useStyles()

  const [leaveSessionMutation, { loading }] = useLeaveSessionMutation()

  return (
    <Grid container item justify="flex-end" spacing={2}>
      <Grid item>
        <Fade in={loading}>
          <CircularProgress />
        </Fade>
      </Grid>
      <Grid item>
        <Button
          className={classes.leaveSessionButton}
          onClick={async () => {
            await leaveSessionMutation({
              variables: {
                sessionID,
                participantID,
              },
            })

            localStorage.removeItem(sessionID)

            history.push('/')
          }}
        >
          Leave Session
        </Button>
      </Grid>
    </Grid>
  )
}
