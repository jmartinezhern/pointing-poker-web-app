import React, { FunctionComponent } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Participant as ParticipantType } from '~generated/graphql'

interface ParticipantProps {
  showVotes: boolean
  participant: ParticipantType
}

const useStyles = makeStyles(() => {
  return {
    participantCard: {
      width: '300px',
    },
    participantCardContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  }
})

export const Participant: FunctionComponent<ParticipantProps> = ({
  showVotes,
  participant: { name, vote, isModerator },
}) => {
  const classes = useStyles()

  return (
    <Card className={classes.participantCard}>
      <CardContent color="info" className={classes.participantCardContent}>
        <Typography variant="h5" component="h2">
          {name} {isModerator ? '(Moderator)' : ''}
        </Typography>
        {!isModerator && showVotes && (
          <Typography variant="h5" component="h2">
            {vote?.abstained ? '?' : vote?.points}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
