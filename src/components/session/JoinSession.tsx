import React, { FunctionComponent, useState } from 'react'
import { Button, createStyles, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { v4 as uuidv4 } from 'uuid'

import { useJoinSessionMutation } from '~generated/graphql'

const useStyles = makeStyles(theme =>
  createStyles({
    joinButton: {
      backgroundColor: theme.palette.primary.main,
      foregroundColor: theme.palette.primary.contrastText,
    },
  })
)

const sessionID = '659d86ae-ec0c-4170-9866-b436a981ce29'

export const JoinSession: FunctionComponent = () => {
  const classes = useStyles()

  const [name, setName] = useState('')

  const [joinSessionMutation, { error }] = useJoinSessionMutation()

  const joinSessionButtonClicked = async (): Promise<void> => {
    const sessionLocalStore = localStorage.getItem(sessionID)
    const sessionData = sessionLocalStore ? JSON.parse(sessionLocalStore) : {}

    sessionData.participantID = uuidv4()

    await joinSessionMutation({
      variables: {
        sessionID,
        participant: {
          id: sessionData.participantID,
          name,
        },
      },
    })

    localStorage.setItem(sessionID, JSON.stringify(sessionData))
  }

  return (
    <Grid container item spacing={2} justify="center" direction="row" alignItems="center">
      <Grid item>
        <TextField
          id="participant-name"
          label="Name"
          onChange={({ target: { value } }) => {
            setName(value)
          }}
          value={name}
          style={{ marginBottom: '14px' }}
        />
      </Grid>
      <Grid item>
        <Button className={classes.joinButton} onClick={joinSessionButtonClicked}>
          Join Session
        </Button>
      </Grid>
    </Grid>
  )
}
