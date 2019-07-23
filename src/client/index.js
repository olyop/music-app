import React from "react"

import { ApolloProvider } from "react-apollo"
import Routes from "./components/Routes"

import apolloClient from "./apollo/client"
import { ROOT_CONTAINER } from "./globals"
import { render } from "react-dom"

import "./index.scss"

render(
  <ApolloProvider client={apolloClient}>
    <Routes/>
  </ApolloProvider>,
  ROOT_CONTAINER
)
