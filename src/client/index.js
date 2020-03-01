import React from "react"

import ReactDOM from "react-dom"
import Application from "./components/Application"
import ApolloClient from "./components/ApolloClient"
import { BrowserRouter as ReactRouter } from "react-router-dom"

import { ROOT_ELEMENT } from "./globals"

import "./index.scss"

ReactDOM.render(
  <ApolloClient>
    <ReactRouter>
      <Application/>
    </ReactRouter>
  </ApolloClient>,
  ROOT_ELEMENT,
)
