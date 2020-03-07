import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import React, { FunctionComponent } from 'react'
import { ApolloProvider } from 'react-apollo'

const endpoint = 'https://fev5xxdscnesvifqf45rj3zsl4.appsync-api.us-east-2.amazonaws.com/graphql'
const apiKey = 'da2-jdwemepvzbeo5okdsfokyqdmtq'

const clientFactory = (): ApolloClient<{}> => {
  const httpLink = createHttpLink({
    uri: endpoint,
    headers: {
      'x-amz-user-agent': 'aws-amplify/2.0.1',
    },
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        'X-Api-Key': apiKey,
        'x-amz-user-agent': 'aws-amplify/2.0.1',
      },
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
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
