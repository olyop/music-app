import React from "react"

import { ApolloProvider } from "react-apollo"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient as Client } from "apollo-client"
import { createUploadLink } from "apollo-upload-client"

import { node } from "prop-types"
import { API_URL } from "../../globals"

const cache = new InMemoryCache({
  dataIdFromObject: ({ id }) => id,
})

const link = createUploadLink({
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
