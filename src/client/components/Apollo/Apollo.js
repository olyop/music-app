import React from "react"

import { ApolloProvider } from "react-apollo"
import ApolloClient from "apollo-boost"

import { API_URL } from "../../globals"
import { node } from "prop-types"

const apolloClient = new ApolloClient({ uri: API_URL })

const Apollo = ({ children }) => (
  <ApolloProvider client={apolloClient}>
    {children}
  </ApolloProvider>
)

Apollo.propTypes = {
  children: node.isRequired
}

export default Apollo
