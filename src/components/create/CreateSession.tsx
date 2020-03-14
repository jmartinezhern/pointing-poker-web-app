import React, { ChangeEvent, FunctionComponent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, CircularProgress, Fade, Grid, Slider, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { v4 as uuidv4 } from 'uuid'

import { useCreateSessionMutation } from '~generated/graphql'

const fibSeq = [1, 2, 3, 5, 8, 13, 20, 40, 100]

const useStyles = makeStyles(() => {
  return { nameFields: { minWidth: '10vw', marginTop: '1em', marginBottom: '2em' } }
})

export const CreateSession: FunctionComponent = () => {
  const history = useHistory()
  const classes = useStyles()
  const [pointingRange, setPointingRange] = useState<number[]>([0, fibSeq.length - 1])

  const [sessionName, setSessionName] = useState<string>('')
  const [moderatorName, setModeratorName] = useState<string>('')

  const [createSessionMutation, { loading }] = useCreateSessionMutation()

  const getSessionNameProblem = (): string | null => {
    if (sessionName.length == 0) {
      return 'Must provide a name'
    }

    return null
  }

  const getModeratorNameProblem = (): string | null => {
    if (moderatorName.length == 0) {
      return 'Must provide a name'
    }

    return null
  }

  const canCreate = (): boolean => {
    return sessionName.length != 0
  }

  const pointingRangeChanged = (_: ChangeEvent<{}>, newValue: number | number[]): void => {
    setPointingRange(newValue as number[])
  }

  const moderatorNameChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value
    setModeratorName(newValue)
  }

  const sessionNameChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value
    setSessionName(newValue)
  }

  const createButtonClicked = async (): Promise<void> => {
    const moderatorID = uuidv4()

    const { data } = await createSessionMutation({
      variables: {
        pointingMax: fibSeq[pointingRange[1]],
        pointingMin: fibSeq[pointingRange[0]],
        name: sessionName,
        moderator: {
          id: moderatorID,
          name: moderatorName,
        },
      },
    })

    if (data?.createSession) {
      const sessionData = {
        participantID: moderatorID,
      }

      localStorage.setItem(data.createSession.id, JSON.stringify(sessionData))

      history.push(`/session/${data.createSession.id}`)
    }
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={0} style={{ minHeight: '100vh' }}>
      <Grid item>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          New Session
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          className={classes.nameFields}
          error={getModeratorNameProblem() != null}
          helperText={getModeratorNameProblem()}
          id="moderator-name"
          label="What is your name?"
          value={moderatorName}
          onChange={moderatorNameChanged}
        />
      </Grid>
      <Grid item>
        <TextField
          className={classes.nameFields}
          error={getSessionNameProblem() != null}
          helperText={getSessionNameProblem()}
          id="session-name"
          label="What is the session's name?"
          value={sessionName}
          onChange={sessionNameChanged}
        />
      </Grid>
      <Grid item>
        <Typography id="range-slider" gutterBottom>
          Pointing Range
        </Typography>
      </Grid>
      <Grid item>
        <Slider
          value={pointingRange}
          onChange={pointingRangeChanged}
          min={0}
          max={fibSeq.length - 1}
          scale={x => fibSeq[x]}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          style={{ minWidth: '10vw' }}
        />
      </Grid>
      <Grid item>
        <Button
          color="primary"
          style={{ marginTop: '4em', minWidth: '14em' }}
          onClick={createButtonClicked}
          disabled={!canCreate()}
        >
          Create
        </Button>
      </Grid>
      <Grid item>
        <Fade in={loading}>
          <CircularProgress style={{ marginTop: '2em' }} />
        </Fade>
      </Grid>
    </Grid>
  )
}
