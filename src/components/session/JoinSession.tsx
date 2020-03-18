import React, { FunctionComponent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, CircularProgress, createStyles, Fade, Grid, Snackbar, TextField } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
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

interface Props {
  sessionID: string
}

export const JoinSession: FunctionComponent<Props> = ({ sessionID }) => {
  const history = useHistory()

  const classes = useStyles()

  const [name, setName] = useState('')

  const [joinSessionMutation, { loading, error }] = useJoinSessionMutation()

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

    history.push(`/session/${sessionID}`)
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
      <Grid item>
        <Fade in={loading}>
          <CircularProgress />
        </Fade>
      </Grid>
      <Snackbar open={error !== undefined} autoHideDuration={10000}>
        <Alert severity="error">{error?.message ?? 'Something went wrong'}</Alert>
      </Snackbar>
    </Grid>
  )
}
