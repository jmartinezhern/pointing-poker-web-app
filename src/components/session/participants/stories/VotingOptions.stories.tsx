import React from 'react'
import { storiesOf } from '@storybook/react'
import { Container } from '@material-ui/core'
import { MockedProvider } from '@apollo/react-testing'
import { FetchResult } from 'apollo-link'

import { VotingOptions } from '~components/session/participants/VotingOptions'
import { SessionProvider } from '~components/core/SessionProvider'
import { ParticipantProvider } from '~components/core/ParticipantProvider'
import { GetSessionDocument, Participant, ParticipantDocument, Session, SetVoteDocument } from '~generated/graphql'

const participantID = '2'

const participant: Participant = {
  id: participantID,
  name: 'test',
  isModerator: false,
  vote: {
    points: 1,
    abstained: false,
  },
}

const sessionID = '1'

const session: Session = {
  id: sessionID,
  name: 'Session',
  createdAt: Date.now(),
  votingStarted: false,
  pointingMax: 100,
  pointingMin: 1,
  expiresIn: 0,
  closed: false,
  reviewingIssue: {
    title: null,
    description: null,
    url: null,
  },
  participants: [participant],
}

const fetchSession = (): FetchResult => ({
  data: {
    session,
  },
})

const fetchParticipant = (): FetchResult => ({
  data: {
    participant,
  },
})

const fetchSetVote = (): FetchResult => ({
  data: {
    setVote: {
      ...session,
      participants: [{ ...participant, vote: { points: 100, abstained: false } }],
    },
  },
})

const mocks = [
  {
    request: {
      query: GetSessionDocument,
      variables: {
        sessionID,
      },
    },
    result: fetchSession,
    newData: fetchSession,
  },
  {
    request: {
      query: ParticipantDocument,
      variables: {
        participantID,
      },
    },
    result: fetchParticipant,
    newData: fetchParticipant,
  },
  {
    request: {
      query: SetVoteDocument,
      variables: {
        participantID,
        sessionID,
        vote: { points: 100, abstained: false },
      },
    },
    result: fetchSetVote,
    newData: fetchSetVote,
  },
]

storiesOf('VotingOptions', module)
  .addDecorator(story => <Container maxWidth="sm">{story()}</Container>)
  .add('Initial State', () => {
    return (
      <MockedProvider mocks={mocks} addTypename={false}>
        <SessionProvider sessionID={sessionID}>
          <ParticipantProvider participantID={participantID}>
            <VotingOptions pointRange={{ max: 100, min: 1 }} />
          </ParticipantProvider>
        </SessionProvider>
      </MockedProvider>
    )
  })
