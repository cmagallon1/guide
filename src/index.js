import React from 'react'
import { render } from 'react-dom'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink
 } from '@apollo/client'
import { split } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './components/App'

// This creates a normal link related to a graphql playground
const httpLink = new HttpLink({
  uri: 'https://api.graphql.guide/graphql'
})

// This creates a link to support subcriptions with web sockets
const wsLink = new WebSocketLink({
  uri: 'wss://api.graphql.guide/subscriptions',
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const cache = new InMemoryCache()

const client = new ApolloClient({ link, cache, connectToDevTools: true })

render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
  , document.getElementById('root')
)


module.hot.accept()
