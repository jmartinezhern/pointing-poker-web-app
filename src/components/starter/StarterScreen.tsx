import React, { FunctionComponent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  makeStyles,
  Button,
  Grid,
  Typography,
  TextField,
  createStyles,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Snackbar,
  Backdrop,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { useDoesSessionExistLazyQuery } from '~generated/graphql'

const useStyles = makeStyles(theme =>
  createStyles({
    actionButton: {
      backgroundColor: theme.palette.primary.main,
      foregroundColor: theme.palette.primary.contrastText,
    },
  })
)

export const StarterScreen: FunctionComponent = () => {
  const history = useHistory()

  const [doesSessionExist, { called, error, loading }] = useDoesSessionExistLazyQuery()

  const [sessionID, setSessionID] = useState('')

  const classes = useStyles()

  const theme = useTheme()

  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  useEffect(() => {
    if (called && !loading && !error) {
      history.push(`/session/${sessionID}`)
      return
    }
  }, [error, history, sessionID, called, loading])

  return (
    <Grid container justify="center" direction="column" alignItems="center" spacing={0} style={{ minHeight: '100vh' }}>
      <Grid item>
        <Typography variant="h1" align="center" gutterBottom>
          Pointing Poker
        </Typography>
      </Grid>
      <Grid container justify="center" direction={matches ? 'column' : 'row'} alignItems="center" spacing={4}>
        <Grid item>
          <Button
            className={classes.actionButton}
            onClick={() => {
              history.push('/create')
            }}
          >
            Create a session
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="h6">or</Typography>
        </Grid>
        <Grid item>
          <TextField
            id="session-id"
            label="Session ID"
            onChange={({ target: { value } }) => {
              setSessionID(value)
            }}
            value={sessionID}
            style={{ marginBottom: '14px' }}
          />
        </Grid>
        <Grid item>
          <Button
            className={classes.actionButton}
            onClick={async () => {
              await doesSessionExist({
                variables: {
                  sessionID,
                },
              })
            }}
          >
            Find Session
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Snackbar open={error !== undefined}>
          <Alert severity="error">{error?.message ?? 'Something went wrong'}</Alert>
        </Snackbar>
      </Grid>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </Grid>
  )
}
