import React, { FunctionComponent } from 'react'
import { Backdrop, CircularProgress, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

import { ActionButton } from '~components/session/ActionButton'
import { StopVotingButton } from '~components/session/moderator/StopVotingButton'
import { StartVotingButton } from '~components/session/moderator/StartVotingButton'
import { useSession } from '~components/core/SessionProvider'
import { useCloseSessionMutation } from '~generated/graphql'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  controlButton: {
    backgroundColor: theme.palette.info.main,
    foregroundColor: theme.palette.info.contrastText,
  },
}))

export const SessionControls: FunctionComponent = () => {
  const { id: sessionID, votingStarted } = useSession()

  const history = useHistory()

  const classes = useStyles()

  const [closeSessionMutation, { loading }] = useCloseSessionMutation()

  return (
    <Grid container item spacing={2} justify="center">
      <Grid item>{votingStarted ? <StopVotingButton /> : <StartVotingButton />}</Grid>
      <Grid item>
        <Backdrop className={classes.backdrop} open={loading} timeout={500}>
          <CircularProgress />
        </Backdrop>
        <ActionButton
          title="Close the session?"
          description="The session will be closed for all participants."
          buttonText="Close Session"
          secondaryActionText="Cancel"
          primaryActionText="Close"
          onPrimaryClick={async () => {
            await closeSessionMutation({
              variables: {
                sessionID,
              },
            })

            localStorage.removeItem(sessionID)

            history.push('/')
          }}
        />
      </Grid>
    </Grid>
  )
}
