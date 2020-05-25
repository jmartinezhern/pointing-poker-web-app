import React, { FunctionComponent, useState } from 'react'
import { Button, CircularProgress, Grid, MenuItem, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useSetVoteMutation } from '~generated/graphql'
import { useSession } from '~components/core/SessionProvider'
import { useParticipant } from '~components/core/ParticipantProvider'

const fibSeq = [1, 2, 3, 5, 8, 13, 20, 40, 100]

const useStyles = makeStyles(theme => ({
  voteButton: {
    backgroundColor: theme.palette.info.main,
    foregroundColor: theme.palette.info.contrastText,
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

  const [setVoteMutation] = useSetVoteMutation()

  const [loadingVote, setLoadingVote] = useState(false)

  const [loadingAbstain, setLoadingAbstain] = useState(false)

  return (
    <Grid container item direction="row" spacing={2} style={{ maxWidth: '256px' }}>
      <Grid item>
        <Select
          value={selection}
          onChange={event => {
            setSelection(event.target.value as number)
          }}
          style={{ width: '50px' }}
        >
          {selections.map(num => (
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
            setLoadingVote(true)

            await setVoteMutation({
              variables: {
                sessionID,
                participantID,
                vote: {
                  points: selection,
                  abstained: false,
                },
              },
            }).finally(() => setLoadingVote(false))
          }}
        >
          {loadingVote ? <CircularProgress size={22} /> : 'Vote'}
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.voteButton}
          onClick={async () => {
            setLoadingAbstain(true)

            await setVoteMutation({
              variables: {
                sessionID,
                participantID,
                vote: {
                  points: 0,
                  abstained: true,
                },
              },
            }).finally(() => {
              setLoadingAbstain(false)
            })
          }}
        >
          {loadingAbstain ? <CircularProgress size={22} /> : 'Abstain'}
        </Button>
      </Grid>
    </Grid>
  )
}
