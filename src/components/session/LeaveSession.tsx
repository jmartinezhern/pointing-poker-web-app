import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { Backdrop, Button, CircularProgress, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useLeaveSessionMutation } from '~generated/graphql'
import { useSession } from '~components/session/SessionProvider'
import { useParticipant } from '~components/session/ParticipantProvider'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  leaveSessionButton: {
    backgroundColor: theme.palette.warning.main,
    foregroundColor: theme.palette.warning.contrastText,
  },
}))

export const LeaveSession: FunctionComponent = () => {
  const { id: sessionID } = useSession()
  const { id: participantID } = useParticipant()

  const history = useHistory()

  const classes = useStyles()

  const [leaveSessionMutation, { loading }] = useLeaveSessionMutation()

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

          history.push('/')
        }}
      >
        Leave Session
      </Button>
      <Backdrop className={classes.backdrop} open={loading} timeout={500}>
        <CircularProgress />
      </Backdrop>
    </Grid>
  )
}
