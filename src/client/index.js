import React from "react"
import ReactDOM from "react-dom"
import Application from "./components/Application"
import ApolloClient from "./components/ApolloClient"
import Authenticate from "./components/Authenticate"
import { BrowserRouter as ReactRouter } from "react-router-dom"

const Index = () => (
  <ReactRouter>
    <Authenticate>
      <ApolloClient>
        <Application />
      </ApolloClient>
    </Authenticate>
  </ReactRouter>
)

ReactDOM.render(
  <Index/>,
  document.getElementById("Index"),
)
