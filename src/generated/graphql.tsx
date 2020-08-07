import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
const gql = Apollo.gql;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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

export type Session = {
  __typename?: 'Session';
  id: Scalars['ID'];
  createdAt: Scalars['Int'];
  participants: Array<Participant>;
  name: Scalars['String'];
  reviewingIssue: ReviewingIssue;
  pointingMin: Scalars['Int'];
  pointingMax: Scalars['Int'];
  expiresIn: Scalars['Int'];
  votingStarted: Scalars['Boolean'];
  closed: Scalars['Boolean'];
};


export type SessionParticipantsArgs = {
  after?: Maybe<Scalars['ID']>;
  first?: Maybe<Scalars['Int']>;
};

export type Participant = {
  __typename?: 'Participant';
  id: Scalars['ID'];
  name: Scalars['String'];
  isModerator: Scalars['Boolean'];
  currentSession?: Maybe<Session>;
  vote?: Maybe<Vote>;
};

export type Vote = {
  __typename?: 'Vote';
  points: Scalars['Int'];
  abstained: Scalars['Boolean'];
};

export type ReviewingIssue = {
  __typename?: 'ReviewingIssue';
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
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

export type SessionDescription = {
  name: Scalars['String'];
  pointingMin: Scalars['Int'];
  pointingMax: Scalars['Int'];
};

export type ParticipantDescription = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type IssueDescription = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type VoteDescription = {
  points?: Maybe<Scalars['Int']>;
  abstained: Scalars['Boolean'];
};

export type Subscription = {
  __typename?: 'Subscription';
  sessionStateChanged?: Maybe<Session>;
};


export type SubscriptionSessionStateChangedArgs = {
  id: Scalars['ID'];
};

export type CloseSessionMutationVariables = Exact<{
  sessionID: Scalars['ID'];
}>;


export type CloseSessionMutation = (
  { __typename?: 'Mutation' }
  & { closeSession?: Maybe<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name' | 'pointingMax' | 'pointingMin' | 'votingStarted' | 'expiresIn' | 'closed'>
    & { reviewingIssue: (
      { __typename?: 'ReviewingIssue' }
      & Pick<ReviewingIssue, 'title' | 'url' | 'description'>
    ), participants: Array<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'isModerator'>
      & { vote?: Maybe<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'points' | 'abstained'>
      )> }
    )> }
  )> }
);

export type CreateSessionMutationVariables = Exact<{
  name: Scalars['String'];
  pointingMin: Scalars['Int'];
  pointingMax: Scalars['Int'];
  moderator: ParticipantDescription;
}>;


export type CreateSessionMutation = (
  { __typename?: 'Mutation' }
  & { createSession?: Maybe<(
    { __typename?: 'Session' }
    & Pick<Session, 'id'>
  )> }
);

export type JoinSessionMutationVariables = Exact<{
  sessionID: Scalars['ID'];
  participant?: Maybe<ParticipantDescription>;
}>;


export type JoinSessionMutation = (
  { __typename?: 'Mutation' }
  & { joinSession?: Maybe<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name' | 'pointingMax' | 'pointingMin' | 'votingStarted' | 'expiresIn' | 'closed'>
    & { reviewingIssue: (
      { __typename?: 'ReviewingIssue' }
      & Pick<ReviewingIssue, 'title' | 'url' | 'description'>
    ), participants: Array<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'isModerator'>
      & { vote?: Maybe<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'points' | 'abstained'>
      )> }
    )> }
  )> }
);

export type LeaveSessionMutationVariables = Exact<{
  sessionID: Scalars['ID'];
  participantID: Scalars['ID'];
}>;


export type LeaveSessionMutation = (
  { __typename?: 'Mutation' }
  & { leaveSession?: Maybe<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name' | 'pointingMax' | 'pointingMin' | 'votingStarted' | 'expiresIn' | 'closed'>
    & { reviewingIssue: (
      { __typename?: 'ReviewingIssue' }
      & Pick<ReviewingIssue, 'title' | 'url' | 'description'>
    ), participants: Array<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'isModerator'>
      & { vote?: Maybe<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'points' | 'abstained'>
      )> }
    )> }
  )> }
);

export type SetIssueMutationVariables = Exact<{
  sessionID: Scalars['ID'];
  description: IssueDescription;
}>;


export type SetIssueMutation = (
  { __typename?: 'Mutation' }
  & { setReviewingIssue?: Maybe<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name' | 'pointingMax' | 'pointingMin' | 'votingStarted' | 'expiresIn' | 'closed'>
    & { reviewingIssue: (
      { __typename?: 'ReviewingIssue' }
      & Pick<ReviewingIssue, 'title' | 'url' | 'description'>
    ), participants: Array<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'isModerator'>
      & { vote?: Maybe<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'points' | 'abstained'>
      )> }
    )> }
  )> }
);

export type SetVoteMutationVariables = Exact<{
  sessionID: Scalars['ID'];
  participantID: Scalars['ID'];
  vote: VoteDescription;
}>;


export type SetVoteMutation = (
  { __typename?: 'Mutation' }
  & { setVote?: Maybe<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name' | 'pointingMax' | 'pointingMin' | 'votingStarted' | 'expiresIn' | 'closed'>
    & { reviewingIssue: (
      { __typename?: 'ReviewingIssue' }
      & Pick<ReviewingIssue, 'title' | 'url' | 'description'>
    ), participants: Array<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'isModerator'>
      & { vote?: Maybe<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'points' | 'abstained'>
      )> }
    )> }
  )> }
);

export type StartVotingMutationVariables = Exact<{
  sessionID: Scalars['ID'];
}>;


export type StartVotingMutation = (
  { __typename?: 'Mutation' }
  & { startVoting?: Maybe<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name' | 'pointingMax' | 'pointingMin' | 'votingStarted' | 'expiresIn' | 'closed'>
    & { reviewingIssue: (
      { __typename?: 'ReviewingIssue' }
      & Pick<ReviewingIssue, 'title' | 'url' | 'description'>
    ), participants: Array<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'isModerator'>
      & { vote?: Maybe<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'points' | 'abstained'>
      )> }
    )> }
  )> }
);

export type StopVotingMutationVariables = Exact<{
  sessionID: Scalars['ID'];
}>;


export type StopVotingMutation = (
  { __typename?: 'Mutation' }
  & { stopVoting?: Maybe<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name' | 'pointingMax' | 'pointingMin' | 'votingStarted' | 'expiresIn' | 'closed'>
    & { reviewingIssue: (
      { __typename?: 'ReviewingIssue' }
      & Pick<ReviewingIssue, 'title' | 'url' | 'description'>
    ), participants: Array<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'isModerator'>
      & { vote?: Maybe<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'points' | 'abstained'>
      )> }
    )> }
  )> }
);

export type DoesSessionExistQueryVariables = Exact<{
  sessionID: Scalars['ID'];
}>;


export type DoesSessionExistQuery = (
  { __typename?: 'Query' }
  & { session?: Maybe<(
    { __typename?: 'Session' }
    & Pick<Session, 'id'>
  )> }
);

export type ParticipantQueryVariables = Exact<{
  participantID: Scalars['ID'];
}>;


export type ParticipantQuery = (
  { __typename?: 'Query' }
  & { participant?: Maybe<(
    { __typename?: 'Participant' }
    & Pick<Participant, 'id' | 'isModerator'>
  )> }
);

export type GetSessionQueryVariables = Exact<{
  sessionID: Scalars['ID'];
}>;


export type GetSessionQuery = (
  { __typename?: 'Query' }
  & { session?: Maybe<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name' | 'pointingMax' | 'pointingMin' | 'votingStarted' | 'createdAt' | 'expiresIn' | 'closed'>
    & { reviewingIssue: (
      { __typename?: 'ReviewingIssue' }
      & Pick<ReviewingIssue, 'title' | 'url' | 'description'>
    ), participants: Array<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'isModerator'>
      & { vote?: Maybe<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'points' | 'abstained'>
      )> }
    )> }
  )> }
);

export type SessionStateChangedSubscriptionVariables = Exact<{
  sessionID: Scalars['ID'];
}>;


export type SessionStateChangedSubscription = (
  { __typename?: 'Subscription' }
  & { sessionStateChanged?: Maybe<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name' | 'closed' | 'pointingMax' | 'pointingMin' | 'votingStarted' | 'expiresIn'>
    & { reviewingIssue: (
      { __typename?: 'ReviewingIssue' }
      & Pick<ReviewingIssue, 'title' | 'url' | 'description'>
    ), participants: Array<(
      { __typename?: 'Participant' }
      & Pick<Participant, 'id' | 'name' | 'isModerator'>
      & { vote?: Maybe<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'points' | 'abstained'>
      )> }
    )> }
  )> }
);


export const CloseSessionDocument = gql`
    mutation CloseSession($sessionID: ID!) {
  closeSession(sessionID: $sessionID) {
    id
    name
    pointingMax
    pointingMin
    votingStarted
    expiresIn
    closed
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
}
    `;
export type CloseSessionMutationFn = Apollo.MutationFunction<CloseSessionMutation, CloseSessionMutationVariables>;

/**
 * __useCloseSessionMutation__
 *
 * To run a mutation, you first call `useCloseSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeSessionMutation, { data, loading, error }] = useCloseSessionMutation({
 *   variables: {
 *      sessionID: // value for 'sessionID'
 *   },
 * });
 */
export function useCloseSessionMutation(baseOptions?: Apollo.MutationHookOptions<CloseSessionMutation, CloseSessionMutationVariables>) {
        return Apollo.useMutation<CloseSessionMutation, CloseSessionMutationVariables>(CloseSessionDocument, baseOptions);
      }
export type CloseSessionMutationHookResult = ReturnType<typeof useCloseSessionMutation>;
export type CloseSessionMutationResult = Apollo.MutationResult<CloseSessionMutation>;
export type CloseSessionMutationOptions = Apollo.BaseMutationOptions<CloseSessionMutation, CloseSessionMutationVariables>;
export const CreateSessionDocument = gql`
    mutation CreateSession($name: String!, $pointingMin: Int!, $pointingMax: Int!, $moderator: ParticipantDescription!) {
  createSession(sessionDescription: {name: $name, pointingMin: $pointingMin, pointingMax: $pointingMax}, moderator: $moderator) {
    id
  }
}
    `;
export type CreateSessionMutationFn = Apollo.MutationFunction<CreateSessionMutation, CreateSessionMutationVariables>;

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
export function useCreateSessionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSessionMutation, CreateSessionMutationVariables>) {
        return Apollo.useMutation<CreateSessionMutation, CreateSessionMutationVariables>(CreateSessionDocument, baseOptions);
      }
export type CreateSessionMutationHookResult = ReturnType<typeof useCreateSessionMutation>;
export type CreateSessionMutationResult = Apollo.MutationResult<CreateSessionMutation>;
export type CreateSessionMutationOptions = Apollo.BaseMutationOptions<CreateSessionMutation, CreateSessionMutationVariables>;
export const JoinSessionDocument = gql`
    mutation JoinSession($sessionID: ID!, $participant: ParticipantDescription) {
  joinSession(sessionID: $sessionID, participant: $participant) {
    id
    name
    pointingMax
    pointingMin
    votingStarted
    expiresIn
    closed
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
}
    `;
export type JoinSessionMutationFn = Apollo.MutationFunction<JoinSessionMutation, JoinSessionMutationVariables>;

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
export function useJoinSessionMutation(baseOptions?: Apollo.MutationHookOptions<JoinSessionMutation, JoinSessionMutationVariables>) {
        return Apollo.useMutation<JoinSessionMutation, JoinSessionMutationVariables>(JoinSessionDocument, baseOptions);
      }
export type JoinSessionMutationHookResult = ReturnType<typeof useJoinSessionMutation>;
export type JoinSessionMutationResult = Apollo.MutationResult<JoinSessionMutation>;
export type JoinSessionMutationOptions = Apollo.BaseMutationOptions<JoinSessionMutation, JoinSessionMutationVariables>;
export const LeaveSessionDocument = gql`
    mutation LeaveSession($sessionID: ID!, $participantID: ID!) {
  leaveSession(sessionID: $sessionID, participantID: $participantID) {
    id
    name
    pointingMax
    pointingMin
    votingStarted
    expiresIn
    closed
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
}
    `;
export type LeaveSessionMutationFn = Apollo.MutationFunction<LeaveSessionMutation, LeaveSessionMutationVariables>;

/**
 * __useLeaveSessionMutation__
 *
 * To run a mutation, you first call `useLeaveSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveSessionMutation, { data, loading, error }] = useLeaveSessionMutation({
 *   variables: {
 *      sessionID: // value for 'sessionID'
 *      participantID: // value for 'participantID'
 *   },
 * });
 */
export function useLeaveSessionMutation(baseOptions?: Apollo.MutationHookOptions<LeaveSessionMutation, LeaveSessionMutationVariables>) {
        return Apollo.useMutation<LeaveSessionMutation, LeaveSessionMutationVariables>(LeaveSessionDocument, baseOptions);
      }
export type LeaveSessionMutationHookResult = ReturnType<typeof useLeaveSessionMutation>;
export type LeaveSessionMutationResult = Apollo.MutationResult<LeaveSessionMutation>;
export type LeaveSessionMutationOptions = Apollo.BaseMutationOptions<LeaveSessionMutation, LeaveSessionMutationVariables>;
export const SetIssueDocument = gql`
    mutation SetIssue($sessionID: ID!, $description: IssueDescription!) {
  setReviewingIssue(sessionID: $sessionID, issue: $description) {
    id
    name
    pointingMax
    pointingMin
    votingStarted
    expiresIn
    closed
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
}
    `;
export type SetIssueMutationFn = Apollo.MutationFunction<SetIssueMutation, SetIssueMutationVariables>;

/**
 * __useSetIssueMutation__
 *
 * To run a mutation, you first call `useSetIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setIssueMutation, { data, loading, error }] = useSetIssueMutation({
 *   variables: {
 *      sessionID: // value for 'sessionID'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useSetIssueMutation(baseOptions?: Apollo.MutationHookOptions<SetIssueMutation, SetIssueMutationVariables>) {
        return Apollo.useMutation<SetIssueMutation, SetIssueMutationVariables>(SetIssueDocument, baseOptions);
      }
export type SetIssueMutationHookResult = ReturnType<typeof useSetIssueMutation>;
export type SetIssueMutationResult = Apollo.MutationResult<SetIssueMutation>;
export type SetIssueMutationOptions = Apollo.BaseMutationOptions<SetIssueMutation, SetIssueMutationVariables>;
export const SetVoteDocument = gql`
    mutation SetVote($sessionID: ID!, $participantID: ID!, $vote: VoteDescription!) {
  setVote(sessionID: $sessionID, participantID: $participantID, vote: $vote) {
    id
    name
    pointingMax
    pointingMin
    votingStarted
    expiresIn
    closed
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
}
    `;
export type SetVoteMutationFn = Apollo.MutationFunction<SetVoteMutation, SetVoteMutationVariables>;

/**
 * __useSetVoteMutation__
 *
 * To run a mutation, you first call `useSetVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setVoteMutation, { data, loading, error }] = useSetVoteMutation({
 *   variables: {
 *      sessionID: // value for 'sessionID'
 *      participantID: // value for 'participantID'
 *      vote: // value for 'vote'
 *   },
 * });
 */
export function useSetVoteMutation(baseOptions?: Apollo.MutationHookOptions<SetVoteMutation, SetVoteMutationVariables>) {
        return Apollo.useMutation<SetVoteMutation, SetVoteMutationVariables>(SetVoteDocument, baseOptions);
      }
export type SetVoteMutationHookResult = ReturnType<typeof useSetVoteMutation>;
export type SetVoteMutationResult = Apollo.MutationResult<SetVoteMutation>;
export type SetVoteMutationOptions = Apollo.BaseMutationOptions<SetVoteMutation, SetVoteMutationVariables>;
export const StartVotingDocument = gql`
    mutation StartVoting($sessionID: ID!) {
  startVoting(sessionID: $sessionID) {
    id
    name
    pointingMax
    pointingMin
    votingStarted
    expiresIn
    closed
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
}
    `;
export type StartVotingMutationFn = Apollo.MutationFunction<StartVotingMutation, StartVotingMutationVariables>;

/**
 * __useStartVotingMutation__
 *
 * To run a mutation, you first call `useStartVotingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartVotingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startVotingMutation, { data, loading, error }] = useStartVotingMutation({
 *   variables: {
 *      sessionID: // value for 'sessionID'
 *   },
 * });
 */
export function useStartVotingMutation(baseOptions?: Apollo.MutationHookOptions<StartVotingMutation, StartVotingMutationVariables>) {
        return Apollo.useMutation<StartVotingMutation, StartVotingMutationVariables>(StartVotingDocument, baseOptions);
      }
export type StartVotingMutationHookResult = ReturnType<typeof useStartVotingMutation>;
export type StartVotingMutationResult = Apollo.MutationResult<StartVotingMutation>;
export type StartVotingMutationOptions = Apollo.BaseMutationOptions<StartVotingMutation, StartVotingMutationVariables>;
export const StopVotingDocument = gql`
    mutation StopVoting($sessionID: ID!) {
  stopVoting(sessionID: $sessionID) {
    id
    name
    pointingMax
    pointingMin
    votingStarted
    expiresIn
    closed
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
}
    `;
export type StopVotingMutationFn = Apollo.MutationFunction<StopVotingMutation, StopVotingMutationVariables>;

/**
 * __useStopVotingMutation__
 *
 * To run a mutation, you first call `useStopVotingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopVotingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopVotingMutation, { data, loading, error }] = useStopVotingMutation({
 *   variables: {
 *      sessionID: // value for 'sessionID'
 *   },
 * });
 */
export function useStopVotingMutation(baseOptions?: Apollo.MutationHookOptions<StopVotingMutation, StopVotingMutationVariables>) {
        return Apollo.useMutation<StopVotingMutation, StopVotingMutationVariables>(StopVotingDocument, baseOptions);
      }
export type StopVotingMutationHookResult = ReturnType<typeof useStopVotingMutation>;
export type StopVotingMutationResult = Apollo.MutationResult<StopVotingMutation>;
export type StopVotingMutationOptions = Apollo.BaseMutationOptions<StopVotingMutation, StopVotingMutationVariables>;
export const DoesSessionExistDocument = gql`
    query DoesSessionExist($sessionID: ID!) {
  session(sessionID: $sessionID) {
    id
  }
}
    `;

/**
 * __useDoesSessionExistQuery__
 *
 * To run a query within a React component, call `useDoesSessionExistQuery` and pass it any options that fit your needs.
 * When your component renders, `useDoesSessionExistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDoesSessionExistQuery({
 *   variables: {
 *      sessionID: // value for 'sessionID'
 *   },
 * });
 */
export function useDoesSessionExistQuery(baseOptions?: Apollo.QueryHookOptions<DoesSessionExistQuery, DoesSessionExistQueryVariables>) {
        return Apollo.useQuery<DoesSessionExistQuery, DoesSessionExistQueryVariables>(DoesSessionExistDocument, baseOptions);
      }
export function useDoesSessionExistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DoesSessionExistQuery, DoesSessionExistQueryVariables>) {
          return Apollo.useLazyQuery<DoesSessionExistQuery, DoesSessionExistQueryVariables>(DoesSessionExistDocument, baseOptions);
        }
export type DoesSessionExistQueryHookResult = ReturnType<typeof useDoesSessionExistQuery>;
export type DoesSessionExistLazyQueryHookResult = ReturnType<typeof useDoesSessionExistLazyQuery>;
export type DoesSessionExistQueryResult = Apollo.QueryResult<DoesSessionExistQuery, DoesSessionExistQueryVariables>;
export const ParticipantDocument = gql`
    query Participant($participantID: ID!) {
  participant(id: $participantID) {
    id
    isModerator
  }
}
    `;

/**
 * __useParticipantQuery__
 *
 * To run a query within a React component, call `useParticipantQuery` and pass it any options that fit your needs.
 * When your component renders, `useParticipantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParticipantQuery({
 *   variables: {
 *      participantID: // value for 'participantID'
 *   },
 * });
 */
export function useParticipantQuery(baseOptions?: Apollo.QueryHookOptions<ParticipantQuery, ParticipantQueryVariables>) {
        return Apollo.useQuery<ParticipantQuery, ParticipantQueryVariables>(ParticipantDocument, baseOptions);
      }
export function useParticipantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParticipantQuery, ParticipantQueryVariables>) {
          return Apollo.useLazyQuery<ParticipantQuery, ParticipantQueryVariables>(ParticipantDocument, baseOptions);
        }
export type ParticipantQueryHookResult = ReturnType<typeof useParticipantQuery>;
export type ParticipantLazyQueryHookResult = ReturnType<typeof useParticipantLazyQuery>;
export type ParticipantQueryResult = Apollo.QueryResult<ParticipantQuery, ParticipantQueryVariables>;
export const GetSessionDocument = gql`
    query getSession($sessionID: ID!) {
  session(sessionID: $sessionID) {
    id
    name
    pointingMax
    pointingMin
    votingStarted
    createdAt
    expiresIn
    closed
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
 *   },
 * });
 */
export function useGetSessionQuery(baseOptions?: Apollo.QueryHookOptions<GetSessionQuery, GetSessionQueryVariables>) {
        return Apollo.useQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, baseOptions);
      }
export function useGetSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSessionQuery, GetSessionQueryVariables>) {
          return Apollo.useLazyQuery<GetSessionQuery, GetSessionQueryVariables>(GetSessionDocument, baseOptions);
        }
export type GetSessionQueryHookResult = ReturnType<typeof useGetSessionQuery>;
export type GetSessionLazyQueryHookResult = ReturnType<typeof useGetSessionLazyQuery>;
export type GetSessionQueryResult = Apollo.QueryResult<GetSessionQuery, GetSessionQueryVariables>;
export const SessionStateChangedDocument = gql`
    subscription SessionStateChanged($sessionID: ID!) {
  sessionStateChanged(id: $sessionID) {
    id
    name
    closed
    pointingMax
    pointingMin
    votingStarted
    expiresIn
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
export function useSessionStateChangedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SessionStateChangedSubscription, SessionStateChangedSubscriptionVariables>) {
        return Apollo.useSubscription<SessionStateChangedSubscription, SessionStateChangedSubscriptionVariables>(SessionStateChangedDocument, baseOptions);
      }
export type SessionStateChangedSubscriptionHookResult = ReturnType<typeof useSessionStateChangedSubscription>;
export type SessionStateChangedSubscriptionResult = Apollo.SubscriptionResult<SessionStateChangedSubscription>;