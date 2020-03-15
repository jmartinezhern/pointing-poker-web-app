import React, { FunctionComponent } from 'react'
import { Button, Grid, useMediaQuery, useTheme } from '@material-ui/core'
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
  pointRange: {
    max: number
    min: number
  }
}

export const VotingOptions: FunctionComponent<Props> = ({ sessionID, participantID, pointRange }) => {
  const classes = useStyles()

  const [setVoteMutation] = useSetVoteMutation()

  const theme = useTheme()

  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Grid container item direction="column" spacing={2} style={matches ? { maxWidth: '240px' } : { maxWidth: '300px' }}>
      <Grid container item spacing={2}>
        {fibSeq
          .filter(num => num >= pointRange.min && num <= pointRange.max)
          .map(num => (
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
    </Grid>
  )
}
