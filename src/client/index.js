import React from "react"

import { BrowserRouter as ReactRouter } from "react-router-dom"
import { ApolloProvider } from "react-apollo"
import Header from "./components/Header"
import Pages from "./components/Pages"

import apolloClient from "./apollo/client"
import { ROOT_ELEMENT } from "./globals"
import { render } from "react-dom"

import "./index.scss"

render(
  <ReactRouter>
    <ApolloProvider client={apolloClient}>
      <Header/>
      <Pages/>
    </ApolloProvider>
  </ReactRouter>,
  ROOT_ELEMENT
)
