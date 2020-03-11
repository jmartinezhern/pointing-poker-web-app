import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities'
import { print } from 'graphql/language/printer'
import React, { FunctionComponent } from 'react'
import { ApolloProvider } from 'react-apollo'
import { OperationOptions, SubscriptionClient } from 'subscriptions-transport-ws'

const apiID = 'fev5xxdscnesvifqf45rj3zsl4'
const region = 'us-east-2'

const wssEndpoint = `wss://${apiID}.appsync-realtime-api.${region}.amazonaws.com/graphql`
const host = `${apiID}.appsync-api.${region}.amazonaws.com`
const httpEndpoint = `https://${host}/graphql`
const apiKey = 'da2-jdwemepvzbeo5okdsfokyqdmtq'

const clientFactory = (): ApolloClient<{}> => {
  const httpLink = createHttpLink({
    uri: httpEndpoint,
    headers: {
      'x-amz-user-agent': 'aws-amplify/2.0.1',
    },
  })

  const header = { host, 'x-api-key': apiKey }

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
      applyMiddleware(options: OperationOptions, next: Function): void {
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

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
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
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
