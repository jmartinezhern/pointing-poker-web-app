import React from 'react'
import { storiesOf } from '@storybook/react'
import { Container } from '@material-ui/core'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { FetchResult } from '@apollo/client'

import { StartVotingButton } from '~components/session/moderator/StartVotingButton'
import { SessionProvider } from '~components/core/SessionProvider'
import { GetSessionDocument, Session, StartVotingDocument } from '~generated/graphql'

const sessionID = '1'

const session: Session = {
  id: sessionID,
  name: 'Session',
  votingStarted: false,
  pointingMax: 1,
  pointingMin: 100,
  expiresIn: 0,
  createdAt: Date.now(),
  closed: false,
  reviewingIssue: {
    title: null,
    description: null,
    url: null,
  },
  participants: [],
}

const fetchSession = (): FetchResult => ({
  data: {
    session: session,
  },
})

storiesOf('StartVotingButton', module)
  .addDecorator(story => <Container maxWidth="sm">{story()}</Container>)
  .add('Initial State', () => {
    const fetchStartVotingResult = (): FetchResult => ({
      data: {
        startVoting: {
          ...session,
          votingStarted: true,
        },
      },
    })

    const mocks: ReadonlyArray<MockedResponse> = [
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
          query: StartVotingDocument,
          variables: {
            sessionID,
          },
        },
        result: fetchStartVotingResult,
        newData: fetchStartVotingResult,
      },
    ]

    return (
      <MockedProvider mocks={mocks} addTypename={false}>
        <SessionProvider sessionID={sessionID}>
          <StartVotingButton />
        </SessionProvider>
      </MockedProvider>
    )
  })
  .add('Mutation Error', () => {
    const mocks: ReadonlyArray<MockedResponse> = [
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
          query: StartVotingDocument,
          variables: {
            sessionID,
          },
        },
        error: new Error('An error occurred'),
        result: () => ({}),
        newData: () => ({}),
      },
    ]

    return (
      <MockedProvider mocks={mocks} addTypename={false}>
        <SessionProvider sessionID={sessionID}>
          <StartVotingButton />
        </SessionProvider>
      </MockedProvider>
    )
  })
