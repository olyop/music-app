import React from "react"

import { HttpLink } from "apollo-link-http"
import { ApolloClient as Client } from "apollo-client"
import { ApolloProvider } from "react-apollo"
import { InMemoryCache } from "apollo-cache-inmemory"

import { node } from "prop-types"
import { API_URL } from "../../globals"

const cache = new InMemoryCache({
  dataIdFromObject: ({ id }) => id,
})

const link = new HttpLink({
  uri: API_URL,
})

const client = new Client({
  link,
  cache,
})

const ApolloClient = ({ children }) => (
  <ApolloProvider
    client={client}
    children={children}
  />
)

ApolloClient.propTypes = {
  children: node.isRequired,
}

export default ApolloClient
