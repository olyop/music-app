import React from "react"

import { ApolloProvider } from "react-apollo"

import { propTypes } from "./props"
import apolloClient from "../../apolloClient"

const Apollo = ({ children }) => (
  <ApolloProvider client={apolloClient}>
    {children}
  </ApolloProvider>
)

Apollo.propTypes = propTypes

export default Apollo
