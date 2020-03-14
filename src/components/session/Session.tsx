import React, { FunctionComponent } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'

import { LeaveSession } from '~components/session/LeaveSession'
import { CloseSession } from '~components/session/CloseSession'
import { VotingOptions } from '~components/session/VotingOptions'
import { VotingControl } from '~components/session/VotingControl'
import { Participants } from '~components/session/Participants'
import { ReviewingIssue } from '~components/session/ReviewingIssue'
import { useGetSessionQuery, useSessionStateChangedSubscription } from '~generated/graphql'

interface Props {
  participantID: string
  sessionID: string
}

export const Session: FunctionComponent<Props> = ({ participantID, sessionID }) => {
  const { data, loading: loadingSession } = useGetSessionQuery({
    variables: {
      sessionID,
      participantID,
    },
  })

  const { data: subData, loading } = useSessionStateChangedSubscription({
    variables: {
      sessionID,
    },
  })

  if (loadingSession) {
    return (
      <Typography variant="h5" align="center" style={{ marginTop: '50vh' }}>
        Loading...
      </Typography>
    )
  }

  if (!data?.session || !data?.participant) {
    return (
      <Container>
        <Typography>Something went wrong</Typography>
      </Container>
    )
  }

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
