import React, { FunctionComponent } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'

import { useGetSessionQuery, useSessionStateChangedSubscription } from '~generated/graphql'
import { Participants } from '~components/session/Participants'
import { ReviewingIssue } from '~components/session/ReviewingIssue'
import { JoinSession } from '~components/session/JoinSession'

const sessionID = '659d86ae-ec0c-4170-9866-b436a981ce29'
const participantID = 'ae90dca2-2704-47fe-925f-e2106f273816'

export const Session: FunctionComponent = () => {
  const { loading, error, data } = useGetSessionQuery({
    variables: {
      sessionID,
      participantID,
    },
  })

  const { data: subData, loading: subLoading, error: subError } = useSessionStateChangedSubscription({
    variables: {
      sessionID,
    },
  })

  if (data && data.session && data.participant) {
    let session
    if (!loading) {
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
      <Grid container justify="center" spacing={2} style={{ marginTop: '50px' }}>
        <JoinSession />
        <Grid item>
          <Typography variant="h2">{session.name}</Typography>
        </Grid>
        <Grid container item justify="center" direction="row" spacing={4}>
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
