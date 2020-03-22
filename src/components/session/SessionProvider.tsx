import React, { createContext, FunctionComponent, useContext } from 'react'
import { Typography } from '@material-ui/core'

import { useGetSessionQuery, Session } from '~generated/graphql'

const SessionContext = createContext<Session | null>(null)

function useSession(): Session {
  const session = useContext(SessionContext)
  if (!session) {
    throw new Error('useSession must be used down-tree from a SessionProvider component')
  }
  return session
}

const SessionProvider: FunctionComponent<{ sessionID: string }> = props => {
  const { sessionID } = props

  if (!sessionID) {
    throw new Error('SessionProvider must be used as a routed-component with a sessionID path param')
  }

  const { data, error, loading } = useGetSessionQuery({ variables: { sessionID } })
  if (loading) {
    return (
      <Typography variant="h5" align="center" style={{ marginTop: '50vh' }}>
        Loading...
      </Typography>
    )
  }

  if (!data || error) {
    console.log(error, data)
    return (
      <Typography variant="h5" align="center" style={{ marginTop: '50vh' }} color="error">
        {error?.message ?? 'Something went wrong...'}
      </Typography>
    )
  }

  if (!data.session) {
    return <>invalid session: {sessionID}</>
  }

  return <SessionContext.Provider value={data.session}>{props.children}</SessionContext.Provider>
}

export { useSession, SessionProvider }
