import React, { FunctionComponent } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useSetVoteMutation } from '~generated/graphql'

const fibSeq = [1, 2, 3, 5, 8, 13, 20, 40, 100]

const useStyles = makeStyles(theme => ({
  voteButton: {
    backgroundColor: theme.palette.primary.main,
    foregroundColor: theme.palette.primary.contrastText,
  },
}))

interface Props {
  sessionID: string
  participantID: string
}

export const VotingOptions: FunctionComponent<Props> = ({ sessionID, participantID }) => {
  const classes = useStyles()

  const [setVoteMutation] = useSetVoteMutation()

  return (
    <Grid container item justify="center" spacing={2}>
      <Grid item>
        <Typography variant="h6" style={{ color: 'green' }}>
          Voting Started!
        </Typography>
      </Grid>
      <Grid container item spacing={4} justify="center">
        {fibSeq.map(num => (
          <Grid item key={num}>
            <Button
              className={classes.voteButton}
              onClick={async () => {
                await setVoteMutation({
                  variables: {
                    sessionID,
                    participantID,
                    vote: {
                      points: num,
                      abstained: false,
                    },
                  },
                })
              }}
            >
              {num}
            </Button>
          </Grid>
        ))}
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
      </Grid>
    </Grid>
  )
}
