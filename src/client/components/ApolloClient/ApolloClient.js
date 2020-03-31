import React from "react"

import { ApolloProvider } from "react-apollo"

import { node } from "prop-types"
import { client } from "../../apollo"

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
