import React from "react"

import { ApolloProvider } from "@apollo/react-hooks"

import client from "../../apollo"
import { node } from "prop-types"

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
