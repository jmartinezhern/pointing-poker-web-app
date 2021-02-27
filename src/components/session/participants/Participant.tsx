import React, { FunctionComponent } from 'react'
import { Card, CardContent, Typography, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Participant as ParticipantType } from '~generated/graphql'
import { useParticipant } from '~components/core/ParticipantProvider'

interface ParticipantProps {
  showVotes: boolean
  participant: ParticipantType
}

const useStyles = makeStyles(() => {
  return {
    participantCard: {
      width: '300px',
      display: 'flex',
      justifyContent: 'space-between',
    },
  }
})

export const Participant: FunctionComponent<ParticipantProps> = ({
  showVotes,
  participant: { id, name, vote, isModerator },
}) => {
  const { id: participantID } = useParticipant()

  const isCurrentParticipant = id === participantID

  const {
    palette: { primary, secondary, success },
  } = useTheme()

  let colors: { backgroundColor: string; foregroundColor: string } | undefined = undefined

  if (isModerator) {
    colors = { backgroundColor: primary.main, foregroundColor: primary.contrastText }
  } else if (isCurrentParticipant) {
    colors = { backgroundColor: secondary.main, foregroundColor: secondary.contrastText }
  } else if (!showVotes && vote) {
    colors = { backgroundColor: success.main, foregroundColor: success.contrastText }
  }

  const classes = useStyles()

  return (
    <Card className={classes.participantCard} style={colors}>
      <CardContent style={{ minWidth: '0' }}>
        <Typography
          variant="h5"
          component="h2"
          style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
          {name}
        </Typography>
        {isModerator && (
          <Typography variant="subtitle1" align="left">
            Moderator
          </Typography>
        )}
        {!isModerator && isCurrentParticipant && <Typography variant="subtitle1">You</Typography>}
      </CardContent>
      <CardContent style={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}>
        {!isModerator && showVotes && (
          <Typography variant="h5" component="h2">
            {vote?.abstained ? '?' : vote?.points}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
