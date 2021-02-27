import React, { FunctionComponent } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Participant } from '~components/session/participants/Participant'
import { useParticipant } from '~components/core/ParticipantProvider'
import { useSession } from '~components/core/SessionProvider'

const useStyles = makeStyles(theme => ({
  participantBox: {
    marginTop: '5px',
    marginRight: '5px',
  },
  container: {
    width: '75%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  responsiveAlign: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
}))

export const Participants: FunctionComponent = () => {
  const { participants, votingStarted } = useSession()

  const { id: participantID } = useParticipant()

  const classes = useStyles()

  const filteredParticipants = participants.slice()

  const moderatorIdx = filteredParticipants.findIndex(p => p.isModerator)
  const moderator = filteredParticipants[moderatorIdx]

  filteredParticipants.splice(moderatorIdx, 1)

  let participant = null

  if (moderator.id !== participantID) {
    const participantIdx = filteredParticipants.findIndex(p => p.id === participantID)
    participant = filteredParticipants[participantIdx]

    filteredParticipants.splice(participantIdx, 1)
  }

  return (
    <Grid container className={classes.container}>
      <Grid container className={classes.responsiveAlign}>
        <Grid item className={classes.participantBox}>
          <Participant participant={moderator} showVotes={false} />
        </Grid>
        {participant ? (
          <Grid item className={classes.participantBox}>
            <Participant participant={participant} showVotes={true} />
          </Grid>
        ) : null}
      </Grid>
      <Grid container alignItems="center" className={classes.responsiveAlign} style={{ marginTop: '20px' }}>
        {filteredParticipants.map(participant => (
          <Grid item className={classes.participantBox} key={participant.id}>
            <Participant participant={participant} showVotes={!votingStarted} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
