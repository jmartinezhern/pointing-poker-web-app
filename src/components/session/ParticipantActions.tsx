import React, { FunctionComponent } from 'react'
import { Backdrop, CircularProgress, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

import { ActionButton } from '~components/session/ActionButton.tsx'
import { VotingOptions } from '~components/session/VotingOptions'
import { useLeaveSessionMutation } from '~generated/graphql'
import { useSession } from '~components/session/SessionProvider'
import { useParticipant } from '~components/session/ParticipantProvider'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}))

export const ParticipantActions: FunctionComponent = () => {
  const session = useSession()

  const participant = useParticipant()

  const [leaveSessionMutation, { loading }] = useLeaveSessionMutation()

  const history = useHistory()

  const classes = useStyles()

  return (
    <Grid item container spacing={2} direction="row" justify="center">
      <Backdrop className={classes.backdrop} open={loading} timeout={500}>
        <CircularProgress />
      </Backdrop>
      {session.votingStarted && <VotingOptions pointRange={{ max: session.pointingMax, min: session.pointingMin }} />}
      <Grid item>
        <ActionButton
          title="Leave the session?"
          description="You will be able to re-join the session as long as it remains open."
          buttonText="Leave Session"
          secondaryActionText="Cancel"
          primaryActionText="Leave"
          onPrimaryClick={async () => {
            await leaveSessionMutation({
              variables: {
                sessionID: session.id,
                participantID: participant.id,
              },
            })

            localStorage.removeItem(session.id)

            history.push('/')
          }}
        />
      </Grid>
    </Grid>
  )
}
