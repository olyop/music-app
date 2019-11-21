import React from "react"

import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"

import { propTypes } from "./props"
import { API_URL } from "../../globals"

const apolloClient = new ApolloClient({ uri: API_URL })

const Apollo = ({ children }) => (
  <ApolloProvider client={apolloClient}>
    {children}
  </ApolloProvider>
)

Apollo.propTypes = propTypes

export default Apollo
