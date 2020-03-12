import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type IssueDescription = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createSession?: Maybe<Session>;
  setReviewingIssue?: Maybe<Session>;
  setVote?: Maybe<Session>;
  joinSession?: Maybe<Session>;
  leaveSession?: Maybe<Session>;
  startVoting?: Maybe<Session>;
  stopVoting?: Maybe<Session>;
  closeSession?: Maybe<Session>;
};


export type MutationCreateSessionArgs = {
  sessionDescription: SessionDescription;
  moderator: ParticipantDescription;
};


export type MutationSetReviewingIssueArgs = {
  sessionID: Scalars['ID'];
  issue?: Maybe<IssueDescription>;
};


export type MutationSetVoteArgs = {
  sessionID: Scalars['ID'];
  participantID: Scalars['ID'];
  vote?: Maybe<VoteDescription>;
};


export type MutationJoinSessionArgs = {
  sessionID: Scalars['ID'];
  participant?: Maybe<ParticipantDescription>;
};


export type MutationLeaveSessionArgs = {
  sessionID: Scalars['ID'];
  participantID: Scalars['ID'];
};


export type MutationStartVotingArgs = {
  sessionID: Scalars['ID'];
  durationInSecs?: Maybe<Scalars['Int']>;
};


export type MutationStopVotingArgs = {
  sessionID: Scalars['ID'];
};


export type MutationCloseSessionArgs = {
  sessionID: Scalars['ID'];
};

export type Participant = {
   __typename?: 'Participant';
  id: Scalars['ID'];
  name: Scalars['String'];
  isModerator: Scalars['Boolean'];
  currentSession?: Maybe<Session>;
  vote?: Maybe<Vote>;
};

export type ParticipantDescription = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  session?: Maybe<Session>;
  participant?: Maybe<Participant>;
};


export type QuerySessionArgs = {
  sessionID: Scalars['ID'];
};


export type QueryParticipantArgs = {
  id: Scalars['ID'];
};

export type ReviewingIssue = {
   __typename?: 'ReviewingIssue';
  title: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type Session = {
   __typename?: 'Session';
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  participants: Array<Participant>;
  name: Scalars['String'];
  reviewingIssue?: Maybe<ReviewingIssue>;
  pointingMin: Scalars['Int'];
  pointingMax: Scalars['Int'];
  expiration: Scalars['Int'];
  votingStarted: Scalars['Boolean'];
};


export type SessionParticipantsArgs = {
  after?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
};

export type SessionDescription = {
  name: Scalars['String'];
  pointingMin: Scalars['Int'];
  pointingMax: Scalars['Int'];
};

export type Subscription = {
   __typename?: 'Subscription';
  sessionStateChanged?: Maybe<Session>;
};


export type SubscriptionSessionStateChangedArgs = {
  id: Scalars['ID'];
};

export type Vote = {
   __typename?: 'Vote';
  points?: Maybe<Scalars['Int']>;
  abstained: Scalars['Boolean'];
};

export type VoteDescription = {
  points?: Maybe<Scalars['Int']>;
  abstained: Scalars['Boolean'];
};

export type CreateSessionMutationVariables = {
  name: Scalars['String'];
  pointingMin: Scalars['Int'];
  pointingMax: Scalars['Int'];
  moderator: ParticipantDescription;
};


export type CreateSessionMutation = (
  { __typename?: 'Mutation' }
  & { createSession: Maybe<(
    { __typename?: 'Session' }
    & Pick<Session, 'id'>
  )> }
);

export type JoinSessionMutationVariables = {
  sessionID: Scalars['ID'];
  participant?: Maybe<ParticipantDescription>;
};


export type JoinSessionMutation = (
  { __typename?: 'Mutation' }
  & { joinSession: Maybe<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name'>
    & { reviewingIssue: Maybe<(
      { __typename?: 'ReviewingIssue' }
      & Pick<ReviewingIssue, 'url' | 'title' | 'description'>
    )>, participants: Array<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'isModerator'>
      & { vote: Maybe<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'points' | 'abstained'>
      )> }
    )> }
  )> }
);

export type GetSessionQueryVariables = {
  sessionID: Scalars['ID'];
  participantID: Scalars['ID'];
};


export type GetSessionQuery = (
  { __typename?: 'Query' }
  & { session: Maybe<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name' | 'pointingMax' | 'pointingMin' | 'votingStarted'>
    & { reviewingIssue: Maybe<(
      { __typename?: 'ReviewingIssue' }
      & Pick<ReviewingIssue, 'title' | 'url' | 'description'>
    )>, participants: Array<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'isModerator'>
      & { vote: Maybe<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'points' | 'abstained'>
      )> }
    )> }
  )>, participant: Maybe<(
    { __typename?: 'Participant' }
    & Pick<Participant, 'isModerator'>
  )> }
);

export type SessionStateChangedSubscriptionVariables = {
  sessionID: Scalars['ID'];
};


export type SessionStateChangedSubscription = (
  { __typename?: 'Subscription' }
  & { sessionStateChanged: Maybe<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name'>
    & { reviewingIssue: Maybe<(
      { __typename?: 'ReviewingIssue' }
      & Pick<ReviewingIssue, 'url' | 'title' | 'description'>
    )>, participants: Array<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'isModerator'>
      & { vote: Maybe<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'points' | 'abstained'>
      )> }
    )> }
  )> }
);


export const CreateSessionDocument = gql`
    mutation CreateSession($name: String!, $pointingMin: Int!, $pointingMax: Int!, $moderator: ParticipantDescription!) {
  createSession(sessionDescription: {name: $name, pointingMin: $pointingMin, pointingMax: $pointingMax}, moderator: $moderator) {
    id
  }
}
    `;
export type CreateSessionMutationFn = ApolloReactCommon.MutationFunction<CreateSessionMutation, CreateSessionMutationVariables>;

/**
 * __useCreateSessionMutation__
 *
 * To run a mutation, you first call `useCreateSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSessionMutation, { data, loading, error }] = useCreateSessionMutation({
 *   variables: {
 *      name: // value for 'name'
 *      pointingMin: // value for 'pointingMin'
 *      pointingMax: // value for 'pointingMax'
 *      moderator: // value for 'moderator'
 *   },
 * });
 */
export function useCreateSessionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSessionMutation, CreateSessionMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateSessionMutation, CreateSessionMutationVariables>(CreateSessionDocument, baseOptions);
      }
export type CreateSessionMutationHookResult = ReturnType<typeof useCreateSessionMutation>;
export type CreateSessionMutationResult = ApolloReactCommon.MutationResult<CreateSessionMutation>;
export type CreateSessionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateSessionMutation, CreateSessionMutationVariables>;
export const JoinSessionDocument = gql`
    mutation JoinSession($sessionID: ID!, $participant: ParticipantDescription) {
  joinSession(sessionID: $sessionID, participant: $participant) {
    id
    name
    reviewingIssue {
      url
      title
      description
    }
    participants {
      id
      name
      isModerator
      vote {
        points
        abstained
      }
    }
  }
}
    `;
export type JoinSessionMutationFn = ApolloReactCommon.MutationFunction<JoinSessionMutation, JoinSessionMutationVariables>;

/**
 * __useJoinSessionMutation__
 *
 * To run a mutation, you first call `useJoinSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinSessionMutation, { data, loading, error }] = useJoinSessionMutation({
 *   variables: {
 *      sessionID: // value for 'sessionID'
 *      participant: // value for 'participant'
 *   },
 * });
 */
export function useJoinSessionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinSessionMutation, JoinSessionMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinSessionMutation, JoinSessionMutationVariables>(JoinSessionDocument, baseOptions);
      }
export type JoinSessionMutationHookResult = ReturnType<typeof useJoinSessionMutation>;
export type JoinSessionMutationResult = ApolloReactCommon.MutationResult<JoinSessionMutation>;
export type JoinSessionMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinSessionMutation, JoinSessionMutationVariables>;
export const GetSessionDocument = gql`
    query getSession($sessionID: ID!, $participantID: ID!) {
  session(sessionID: $sessionID) {
    id
    name
    pointingMax
    pointingMin
    votingStarted
    reviewingIssue {
      title
      url
      description
    }
    participants {
      id
      name
      isModerator
      vote {
        points
        abstained
      }
    }
  }
  participant(id: $participantID) {
    isModerator
  }
}
    `;

/**
 * __useGetSessionQuery__
 *
 * To run a query within a React component, call `useGetSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionQuery({
 *   variables: {
 *      sessionID: // value for 'sessionID'
 *      participantID: // value for 'participantID'
 *   },
 * });
 */
export function useGetSessionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSessionQuery, GetSessionQueryVariables>) {
        return ApolloReactHooks.useQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, baseOptions);
      }
export function useGetSessionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSessionQuery, GetSessionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, baseOptions);
        }
export type GetSessionQueryHookResult = ReturnType<typeof useGetSessionQuery>;
export type GetSessionLazyQueryHookResult = ReturnType<typeof useGetSessionLazyQuery>;
export type GetSessionQueryResult = ApolloReactCommon.QueryResult<GetSessionQuery, GetSessionQueryVariables>;
export const SessionStateChangedDocument = gql`
    subscription SessionStateChanged($sessionID: ID!) {
  sessionStateChanged(id: $sessionID) {
    id
    name
    reviewingIssue {
      url
      title
      description
    }
    participants {
      id
      name
      isModerator
      vote {
        points
        abstained
      }
    }
  }
}
    `;

/**
 * __useSessionStateChangedSubscription__
 *
 * To run a query within a React component, call `useSessionStateChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSessionStateChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionStateChangedSubscription({
 *   variables: {
 *      sessionID: // value for 'sessionID'
 *   },
 * });
 */
export function useSessionStateChangedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SessionStateChangedSubscription, SessionStateChangedSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SessionStateChangedSubscription, SessionStateChangedSubscriptionVariables>(SessionStateChangedDocument, baseOptions);
      }
export type SessionStateChangedSubscriptionHookResult = ReturnType<typeof useSessionStateChangedSubscription>;
export type SessionStateChangedSubscriptionResult = ApolloReactCommon.SubscriptionResult<SessionStateChangedSubscription>;