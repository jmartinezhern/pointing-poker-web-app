import React, { FunctionComponent } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Participant as ParticipantType } from '~generated/graphql'

interface ParticipantProps {
  participant: ParticipantType
}

const useStyles = makeStyles(() => {
  return {
    participantCard: {
      flexDirection: 'row',
    },
  }
})

export const Participant: FunctionComponent<ParticipantProps> = ({ participant: { name, vote, isModerator } }) => {
  const classes = useStyles()

  return (
    <Card className={classes.participantCard}>
      <CardContent color="info">
        <Typography variant="h5" component="h2">
          {name} {isModerator ? '(Moderator)' : ''}
        </Typography>
        {!isModerator && (
          <Typography variant="subtitle1" component="h4">
            {vote?.abstained ? 'Abstained from voting' : `Voted with a ${vote?.points}`}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
