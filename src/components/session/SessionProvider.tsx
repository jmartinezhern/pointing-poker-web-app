import React, { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from '@material-ui/core'

import { JoinSession } from '~components/session/JoinSession'
import { Session } from '~components/session/Session'

export const SessionProvider: FunctionComponent = () => {
  const { sessionID } = useParams<{ sessionID: string }>()

  let participantID: string | undefined

  const sessionStore = localStorage.getItem(sessionID)

  if (sessionStore) {
    participantID = JSON.parse(sessionStore).participantID
  }

  if (!participantID) {
    return (
      <Grid
        container
        item
        direction="column"
        justify="center"
        alignItems="center"
        spacing={0}
        style={{ minHeight: '100vh' }}
      >
        <JoinSession />
      </Grid>
    )
  }

  return <Session sessionID={sessionID} participantID={participantID} />
}
