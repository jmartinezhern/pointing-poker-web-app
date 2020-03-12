import React, { FunctionComponent } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'

import {
  useGetSessionQuery,
  useParticipantJoinedSubscription,
  Participant as ParticipantType,
} from '~generated/graphql'
import { Participant } from '~components/session/Participant'
import { ReviewingIssue } from '~components/session/ReviewingIssue'
import { JoinSession } from '~components/session/JoinSession'

const sessionID = '659d86ae-ec0c-4170-9866-b436a981ce29'
const userID = 'ae90dca2-2704-47fe-925f-e2106f273816'

export const Session: FunctionComponent = () => {
  const { loading, error, data } = useGetSessionQuery({
    variables: {
      sessionID,
      userID,
    },
  })

  const { data: subData, loading: subLoading, error: subError } = useParticipantJoinedSubscription({
    variables: {
      sessionID,
    },
  })

  if (data && data.session && data.participant) {
    const session = data.session

    const currentParticipant = data.participant

    let participants: ParticipantType[] = []
    if (!loading) {
      participants = session.participants
    } else if (subData?.participantJoinedSession) {
      participants = subData.participantJoinedSession.participants
    }

    participants = participants.sort((a, b) => {
      if (a.isModerator) {
        return -1
      } else if (b.isModerator) {
        return 1
      }

      if (a.name == b.name) {
        return 0
      } else if (a.name > b.name) {
        return 1
      }

      return -1
    })

    return (
      <Container>
        <JoinSession />
        <Grid container justify="center" spacing={2} style={{ marginTop: '50px' }}>
          <Grid item>
            <Typography variant="h2">{session.name}</Typography>
          </Grid>
          <Grid container item direction="row" spacing={2}>
            <Grid container item direction="column" spacing={2} style={{ maxWidth: '15vw' }}>
              {participants.map(participant => (
                <Grid key={participant.id} item>
                  <Participant participant={participant} />
                </Grid>
              ))}
            </Grid>
            <ReviewingIssue reviewingIssue={session.reviewingIssue} fieldsEnabled={currentParticipant.isModerator} />
          </Grid>
        </Grid>
      </Container>
    )
  }

  return (
    <Container>
      <Typography>Something went wrong</Typography>
    </Container>
  )
}
