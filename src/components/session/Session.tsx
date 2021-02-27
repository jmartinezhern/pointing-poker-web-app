import React, { FunctionComponent, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CircularProgress, createStyles, Grid, makeStyles, Typography } from '@material-ui/core'

import { Participants } from '~components/session/Participants'
import { Issue } from '~/components/session/Issue'
import { Results } from '~components/session/Results'
import { useSession } from '~components/core/SessionProvider'
import { useParticipant } from '~components/core/ParticipantProvider'
import { SessionControls } from '~components/session/moderator/SessionControls'
import { ParticipantActions } from '~components/session/participants/ParticipantActions'
import { Session as SessionType, useSessionStateChangedSubscription } from '~generated/graphql'

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      flexDirection: 'row',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },
  })
)

export const Session: FunctionComponent = () => {
  let session = useSession()

  const classes = useStyles()

  const participant = useParticipant()

  const history = useHistory()

  const { data, loading } = useSessionStateChangedSubscription({
    variables: {
      sessionID: session.id,
    },
  })

  if (!loading) {
    session = data?.sessionStateChanged as SessionType
  }

  const now = new Date()
  const expiresIn = new Date(session.expiresIn * 1000)

  const expires = (expiresIn.getTime() - now.getTime()) / 1000

  const closed = session.closed || expires === 0

  useEffect(() => {
    if (closed) {
      const timer = setTimeout(() => {
        history.push('/')
      }, 3000)
      return () => clearTimeout(timer)
    }
  })

  if (session.closed || expires === 0) {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={0}
        style={{ minHeight: '100vh' }}
      >
        <Grid item>
          <Typography variant="h5" align="center">
            The current session has closed. Leaving...
          </Typography>
        </Grid>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container justify="center" alignItems="center" direction="column" spacing={4}>
      <Grid item>
        <Typography variant="h2">{session.name}</Typography>
      </Grid>
      {participant.isModerator ? <SessionControls /> : <ParticipantActions />}
      <Grid container justify="center" alignItems="center" className={classes.container}>
        <Grid container style={{ width: '50%' }}>
          <Results
            voting={session.votingStarted}
            votes={session.participants
              .filter(participant => !participant.isModerator)
              .map(participant => participant.vote?.points ?? 0)}
          />
        </Grid>
        <Grid container direction="column" style={{ width: '50%' }}>
          <Participants />
          <Issue allowEditing={participant.isModerator} issue={session.reviewingIssue} />
        </Grid>
      </Grid>
    </Grid>
  )
}
