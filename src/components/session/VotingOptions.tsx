import React, { FunctionComponent, useState } from 'react'
import { Button, CircularProgress, Fade, Grid, MenuItem, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useSetVoteMutation } from '~generated/graphql'
import { useSession } from '~components/session/SessionProvider'
import { useParticipant } from '~components/session/ParticipantProvider'

const fibSeq = [1, 2, 3, 5, 8, 13, 20, 40, 100]

const useStyles = makeStyles(theme => ({
  voteButton: {
    backgroundColor: theme.palette.primary.main,
    foregroundColor: theme.palette.primary.contrastText,
  },
}))

interface Props {
  pointRange: {
    max: number
    min: number
  }
}

export const VotingOptions: FunctionComponent<Props> = ({ pointRange }) => {
  const { id: sessionID } = useSession()

  const { id: participantID } = useParticipant()

  const classes = useStyles()

  const selections = fibSeq.filter(num => num >= pointRange.min && num <= pointRange.max)

  const [selection, setSelection] = useState(selections[0])

  const [setVoteMutation, { loading }] = useSetVoteMutation()

  return (
    <Grid container item direction="row" spacing={2} justify="center">
      <Grid item>
        <Select
          value={selection}
          onChange={event => {
            setSelection(event.target.value as number)
          }}
        >
          {fibSeq.map(num => (
            <MenuItem key={num} value={num}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <Button
          className={classes.voteButton}
          onClick={async () => {
            await setVoteMutation({
              variables: {
                sessionID,
                participantID,
                vote: {
                  points: selection,
                  abstained: false,
                },
              },
            })
          }}
        >
          Vote
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.voteButton}
          onClick={async () => {
            await setVoteMutation({
              variables: {
                sessionID,
                participantID,
                vote: {
                  points: 0,
                  abstained: true,
                },
              },
            })
          }}
        >
          Abstain
        </Button>
      </Grid>
      <Grid item>
        <Fade in={loading}>
          <CircularProgress />
        </Fade>
      </Grid>
    </Grid>
  )
}
