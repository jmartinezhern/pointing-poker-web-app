import { ApolloClient, ApolloProvider, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { InMemoryCache } from '@apollo/client/cache'
import { getMainDefinition } from '@apollo/client/utilities'
import { print } from 'graphql/language/printer'
import React, { FunctionComponent } from 'react'
import { OperationOptions, SubscriptionClient } from 'subscriptions-transport-ws'

const clientFactory = (): ApolloClient<unknown> => {
  const host = process.env.GRAPHQL_API_HOST
  const apiKey = process.env.GRAPHQL_API_KEY

  const httpLink = createHttpLink({
    uri: `https://${host}/graphql`,
    headers: {
      'x-amz-user-agent': 'aws-amplify/2.0.1',
    },
  })

  const header = { host, 'x-api-key': apiKey }

  const wssEndpoint = `wss://${process.env.GRAPHQL_WS_HOST}/graphql`

  const subClient = new SubscriptionClient(
    `${wssEndpoint}?header=${btoa(JSON.stringify(header))}&payload=${btoa(JSON.stringify({}))}`,
    {
      reconnect: true,
      lazy: true,
      inactivityTimeout: 0,
      timeout: 300000,
    }
  )

  subClient.use([
    {
      applyMiddleware(options: OperationOptions, next: () => void): void {
        if (options.query) {
          let query = ''

          if (typeof options.query == 'string') {
            query = options.query
          } else {
            query = print(options.query)
          }

          options.data = JSON.stringify({ ...options, query })
        }

        const dt = new Date()
        const dtStr = dt.toISOString().replace(/[:\-]|\.\d{3}/g, '')

        options.extensions = {
          authorization: {
            host,
            'x-amz-date': dtStr,
            'x-amz-user-agent': 'aws-amplify/2.0.1',
            'x-api-key': apiKey,
          },
        }

        next()
      },
    },
  ])

  const wsLink = new WebSocketLink(subClient)

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        'X-Api-Key': apiKey,
        'x-amz-user-agent': 'aws-amplify/2.0.1',
      },
    }
  })

  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink,
    authLink.concat(httpLink)
  )

  const cache = new InMemoryCache({
    typePolicies: {
      Session: {
        fields: {
          participants: {
            merge: false,
          },
        },
      },
    },
  })

  return new ApolloClient({
    link,
    cache,
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-first',
      },
      mutate: {
        fetchPolicy: 'no-cache',
      },
    },
  })
}

export const GraphQLProvider: FunctionComponent = props => {
  const client = clientFactory()
  console.log(client)
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
