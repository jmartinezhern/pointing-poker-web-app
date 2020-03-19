import React, { FunctionComponent, lazy } from 'react'
import { Grid, Typography } from '@material-ui/core'

import { LeaveSession } from '~components/session/LeaveSession'
import { CloseSession } from '~components/session/CloseSession'
import { Participants } from '~components/session/Participants'
import { ReviewingIssue } from '~components/session/ReviewingIssue'
import { Session as SessionType, useSessionStateChangedSubscription } from '~generated/graphql'

interface Props {
  session: SessionType
  participant: { id: string; isModerator: boolean }
}

export const Session: FunctionComponent<Props> = ({ session, participant }) => {
  const { data, loading } = useSessionStateChangedSubscription({
    variables: {
      sessionID: session.id,
    },
  })

  if (!loading) {
    session = data?.sessionStateChanged as SessionType
  }

  const Results = lazy(async () => {
    return { default: (await import('~components/session/Results')).Results }
  })

  const SessionControls = lazy(async () => {
    return { default: (await import('~components/session/SessionControls')).SessionControls }
  })

  const VotingOptions = lazy(async () => {
    return { default: (await import('~components/session/VotingOptions')).VotingOptions }
  })

  const participants = session.participants

  return (
    <Grid container justify="center" alignItems="center" direction="column" spacing={4}>
      <Grid container item>
        {!participant.isModerator && <LeaveSession sessionID={session.id} participantID={participant.id} />}
        {participant.isModerator && <CloseSession sessionID={session.id} />}
      </Grid>
      <Grid item>
        <Typography variant="h2">{session.name}</Typography>
      </Grid>
      <Grid item>
        {!session.votingStarted && (
          <Results
            votes={session.participants
              .filter(participant => !participant.isModerator)
              .map(participant => participant.vote.points)}
          />
        )}
      </Grid>
      <Grid item>
        {participant.isModerator && <SessionControls sessionID={session.id} votingStarted={session.votingStarted} />}
        {session.votingStarted && !participant.isModerator && (
          <VotingOptions
            sessionID={session.id}
            participantID={participant.id}
            pointRange={{ max: session.pointingMax, min: session.pointingMin }}
          />
        )}
      </Grid>
      <Grid container item justify="center" direction="row" spacing={2}>
        <Grid item>
          <ReviewingIssue reviewingIssue={session.reviewingIssue} />
        </Grid>
        <Grid item>
          <Participants
            participants={participants}
            votingStarted={session.votingStarted}
            participantID={participant.id}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
