import React, { CSSProperties, FunctionComponent, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Button,
  CircularProgress,
  Fade,
  Grid,
  Slider,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import { v4 as uuidv4 } from 'uuid'

import { useCreateSessionMutation } from '~generated/graphql'

interface State {
  pointingRange: [number, number]
  moderatorName: {
    value: string
    error?: string
  }
  sessionName: {
    value: string
    error?: string
  }
}

interface Action {
  type: string
  payload: {
    moderatorName?: string
    sessionName?: string
    pointingRange?: [number, number]
  }
}

const fibSeq = [1, 2, 3, 5, 8, 13, 20, 40, 100]

const useStyles = makeStyles(() => {
  return { nameFields: { marginTop: '1em', marginBottom: '2em' } }
})

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_POINTING_RANGE':
      if (!action.payload.pointingRange) {
        throw new Error('pointing range is undefined')
      }

      return { ...state, pointingRange: action.payload.pointingRange }
    case 'UPDATE_SESSION_NAME':
      if (!action.payload.sessionName || action.payload.sessionName.length == 0) {
        return { ...state, sessionName: { value: '', error: 'Session needs a name' } }
      }

      return { ...state, sessionName: { value: action.payload.sessionName } }
    case 'UPDATE_MODERATOR_NAME':
      if (!action.payload.moderatorName || action.payload.moderatorName.length == 0) {
        return { ...state, moderatorName: { value: '', error: 'Moderator needs a name' } }
      }

      return { ...state, moderatorName: { value: action.payload.moderatorName } }
  }
  throw new Error(`unexpected action type ${action.type}`)
}

export const CreateSession: FunctionComponent = () => {
  const history = useHistory()

  const classes = useStyles()

  const theme = useTheme()

  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  const [{ pointingRange, moderatorName, sessionName }, dispatch] = useReducer(reducer, {
    pointingRange: [0, fibSeq.length - 1],
    moderatorName: { value: '' },
    sessionName: { value: '' },
  })

  const [createSessionMutation, { error, loading }] = useCreateSessionMutation()

  const responsiveWidth = (): CSSProperties => {
    return matches ? { width: '75vw' } : { width: '300px' }
  }

  const canCreate = (): boolean => {
    return sessionName.value.length != 0
  }

  const createButtonClicked = async (): Promise<void> => {
    const moderatorID = uuidv4()

    const { data } = await createSessionMutation({
      variables: {
        pointingMax: fibSeq[pointingRange[1]],
        pointingMin: fibSeq[pointingRange[0]],
        name: sessionName.value,
        moderator: {
          id: moderatorID,
          name: moderatorName.value,
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
          error={moderatorName.error !== undefined}
          helperText={moderatorName.error}
          id="moderator-name"
          label="What is your name?"
          value={moderatorName.value}
          onChange={event => {
            dispatch({ type: 'UPDATE_MODERATOR_NAME', payload: { moderatorName: event.target.value } })
          }}
          style={responsiveWidth()}
        />
      </Grid>
      <Grid item>
        <TextField
          className={classes.nameFields}
          error={sessionName.error !== undefined}
          helperText={sessionName.error}
          id="session-name"
          label="What is the session's name?"
          value={sessionName.value}
          onChange={event => {
            dispatch({ type: 'UPDATE_SESSION_NAME', payload: { sessionName: event.target.value } })
          }}
          style={responsiveWidth()}
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
          onChange={(_, newValue) => {
            dispatch({ type: 'UPDATE_POINTING_RANGE', payload: { pointingRange: newValue as [number, number] } })
          }}
          min={0}
          max={fibSeq.length - 1}
          scale={x => fibSeq[x]}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          style={responsiveWidth()}
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
      <Snackbar open={error !== undefined}>
        <Alert severity="error">{error?.message ?? 'Something went wrong'}</Alert>
      </Snackbar>
    </Grid>
  )
}
