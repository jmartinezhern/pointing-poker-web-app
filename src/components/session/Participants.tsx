import React, { FunctionComponent } from 'react'
import { Grid } from '@material-ui/core'

import { Participant as ParticipantType } from '~generated/graphql'
import { Participant } from '~components/session/Participant'

interface ParticipantsProps {
  participants: ParticipantType[]
}

export const Participants: FunctionComponent<ParticipantsProps> = ({ participants }) => {
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
    <Grid container item direction="column" spacing={2} style={{ maxWidth: '15vw' }}>
      {participants.map(participant => (
        <Grid key={participant.id} item>
          <Participant participant={participant} />
        </Grid>
      ))}
    </Grid>
  )
}
