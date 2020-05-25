import React, { FunctionComponent } from 'react'
import { List, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Participant as ParticipantType } from '~generated/graphql'
import { Participant } from '~components/session/participants/Participant'
import { useParticipant } from '~components/core/ParticipantProvider'
import { useSession } from '~components/core/SessionProvider'

const useStyles = makeStyles(() => ({
  participantBox: {
    width: '300px',
  },
}))

const sortParticipants = (a: ParticipantType, b: ParticipantType): number => {
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
}

export const Participants: FunctionComponent = () => {
  const { participants, votingStarted } = useSession()

  const { id: participantID } = useParticipant()

  const classes = useStyles()

  return (
    <List disablePadding={true}>
      {participants.sort(sortParticipants).map(participant => (
        <ListItem className={classes.participantBox} key={participant.id} dense={true}>
          <Participant
            participant={participant}
            showVotes={!participant.isModerator && (!votingStarted || participantID === participant.id)}
          />
        </ListItem>
      ))}
    </List>
  )
}
