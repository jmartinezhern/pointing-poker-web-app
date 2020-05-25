import React, { createContext, FunctionComponent, useContext } from 'react'
import { Typography } from '@material-ui/core'

import { useParticipantQuery } from '~generated/graphql'

interface Participant {
  id: string
  isModerator: boolean
}

const ParticipantContext = createContext<Participant | null>(null)

function useParticipant(): Participant {
  const participant = useContext(ParticipantContext)

  if (!participant) {
    throw new Error('useParticipant must be used down-tree from a ParticipantProvider component')
  }

  return participant
}

const ParticipantProvider: FunctionComponent<{ participantID: string }> = props => {
  const { participantID } = props

  if (!participantID) {
    throw new Error('ParticipantProvider was not provided a participantID')
  }

  const { data, error, loading } = useParticipantQuery({ variables: { participantID } })
  if (loading) {
    return (
      <Typography variant="h5" align="center" style={{ marginTop: '50vh' }}>
        Loading...
      </Typography>
    )
  }

  if (!data || error) {
    return (
      <Typography variant="h5" align="center" style={{ marginTop: '50vh' }} color="error">
        {error?.message ?? 'Something went wrong...'}
      </Typography>
    )
  }

  if (!data.participant) {
    return <>invalid participant: {participantID}</>
  }

  return <ParticipantContext.Provider value={data.participant}>{props.children}</ParticipantContext.Provider>
}

export { useParticipant, ParticipantProvider }
