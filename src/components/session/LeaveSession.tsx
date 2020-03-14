import React, { FunctionComponent } from 'react'
import { Button, Grid } from '@material-ui/core'
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
  const classes = useStyles()

  const [leaveSessionMutation] = useLeaveSessionMutation()

  return (
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

          window.location.replace('http://localhost:1234')
        }}
      >
        Leave Session
      </Button>
    </Grid>
  )
}
