import React, { FunctionComponent } from 'react'
import { List, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Participant as ParticipantType } from '~generated/graphql'
import { Participant } from '~components/session/Participant'

const useStyles = makeStyles(() => ({
  participantBox: {
    width: '300px',
  },
}))

interface ParticipantsProps {
  participants: ParticipantType[]
}

export const Participants: FunctionComponent<ParticipantsProps> = ({ participants }) => {
  const classes = useStyles()

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
    <List>
      {participants.map(participant => (
        <ListItem className={classes.participantBox} key={participant.id}>
          <Participant participant={participant} />
        </ListItem>
      ))}
    </List>
  )
}
