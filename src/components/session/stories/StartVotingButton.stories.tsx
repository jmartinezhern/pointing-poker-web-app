import React from 'react'
import { storiesOf } from '@storybook/react'
import { Container } from '@material-ui/core'
import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import { FetchResult } from 'apollo-link'

import { StartVotingButton } from '~components/session/StartVotingButton'
import { SessionProvider } from '~components/session/SessionProvider'
import { GetSessionDocument, StartVotingDocument } from '~generated/graphql'

const sessionID = '1'

const sessionBaseline = {
  id: sessionID,
  name: 'Session',
  votingStarted: false,
  pointingMax: 1,
  pointingMin: 100,
  expiration: 0,
  reviewingIssue: {
    title: null,
    description: null,
    url: null,
  },
  participants: [],
}

const fetchSession = (): FetchResult => ({
  data: {
    session: sessionBaseline,
  },
})

storiesOf('StartVotingButton', module)
  .addDecorator(story => <Container maxWidth="sm">{story()}</Container>)
  .add('Initial State', () => {
    const fetchStartVotingResult = (): FetchResult => ({
      data: {
        startVoting: {
          ...sessionBaseline,
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
