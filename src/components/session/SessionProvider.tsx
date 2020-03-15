import React, { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core'

import { JoinSession } from '~components/session/JoinSession'
import { Session } from '~components/session/Session'
import { useGetSessionLazyQuery } from '~generated/graphql'

export const SessionProvider: FunctionComponent = () => {
  const [getSessionQuery, { called, data, loading }] = useGetSessionLazyQuery()

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
        <JoinSession sessionID={sessionID} />
      </Grid>
    )
  }

  if (!called) {
    getSessionQuery({
      variables: {
        sessionID,
        participantID,
      },
    })
  }

  if (loading) {
    return (
      <Typography variant="h5" align="center" style={{ marginTop: '50vh' }}>
        Loading...
      </Typography>
    )
  }

  if (data?.session && data?.participant) {
    return <Session session={data.session} participant={data.participant} />
  }

  console.log(data?.session, data?.participant)

  return (
    <Typography variant="h2" align="center">
      Something went wrong
    </Typography>
  )
}
