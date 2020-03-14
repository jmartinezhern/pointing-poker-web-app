import React, { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Grid, Typography } from '@material-ui/core'

import { useGetSessionLazyQuery, useSessionStateChangedSubscription } from '~generated/graphql'
import { Participants } from '~components/session/Participants'
import { ReviewingIssue } from '~components/session/ReviewingIssue'
import { JoinSession } from '~components/session/JoinSession'
import { VotingOptions } from '~components/session/VotingOptions'
import { VotingControl } from '~components/session/VotingControl'
import { LeaveSession } from '~components/session/LeaveSession'
import { CloseSession } from '~components/session/CloseSession'

export const Session: FunctionComponent = () => {
  const { sessionID } = useParams<{ sessionID: string }>()

  const [loadSession, { called, data, loading: loadingSession }] = useGetSessionLazyQuery()

  const { data: subData, loading } = useSessionStateChangedSubscription({
    variables: {
      sessionID,
    },
  })

  const sessionStore = localStorage.getItem(sessionID)

  let participantID: string | null = null

  if (sessionStore) {
    participantID = JSON.parse(sessionStore).participantID
  }

  if (!participantID) {
    return (
      <Grid
        container
        item
        direction="column"
        justify="center"
        alignItems="center"
        spacing={0}
        style={{ minHeight: '100vh' }}
      >
        <JoinSession />
      </Grid>
    )
  }

  if (!called) {
    loadSession({
      variables: {
        sessionID,
        participantID,
      },
    })
  }

  if (loadingSession) {
    return (
      <Typography variant="h5" align="center" style={{ marginTop: '50vh' }}>
        Loading...
      </Typography>
    )
  }

  if (data && data.session && data.participant) {
    let session
    if (loading) {
      session = data.session
    } else {
      session = subData?.sessionStateChanged
    }

    if (!session) {
      return <Typography>Session is undefined</Typography>
    }

    const participants = session.participants

    const currentParticipant = data.participant

    return (
      <Grid container justify="center" spacing={6}>
        <Grid container item justify="flex-end">
          {!currentParticipant.isModerator && <LeaveSession sessionID={sessionID} participantID={participantID} />}
          {currentParticipant.isModerator && <CloseSession sessionID={sessionID} />}
        </Grid>
        <Grid item>
          <Typography variant="h2">{session.name}</Typography>
        </Grid>
        <Grid container item justify="center" direction="row" spacing={4}>
          {session.votingStarted && !currentParticipant.isModerator && (
            <VotingOptions sessionID={sessionID} participantID={participantID} />
          )}
          {currentParticipant.isModerator && (
            <VotingControl sessionID={sessionID} votingStarted={session.votingStarted} />
          )}
          <Participants participants={participants} />
          <ReviewingIssue reviewingIssue={session.reviewingIssue} fieldsEnabled={currentParticipant.isModerator} />
        </Grid>
      </Grid>
    )
  }

  return (
    <Container>
      <Typography>Something went wrong</Typography>
    </Container>
  )
}
