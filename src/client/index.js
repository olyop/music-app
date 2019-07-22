import React from "react"

import { Provider as ReduxProvider } from "react-redux"
import { ApolloProvider } from "react-apollo"
import Routes from "./components/Routes"

import apolloClient from "./apollo/client"
import { ROOT_CONTAINER } from "./globals"
import reduxStore from "./redux/store"
import { render } from "react-dom"

import "./index.scss"

render(
  <ReduxProvider store={reduxStore}>
    <ApolloProvider client={apolloClient}>
      <Routes/>
    </ApolloProvider>
  </ReduxProvider>,
  ROOT_CONTAINER
)
