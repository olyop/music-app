import React from "react"

import App from "./components/App"
import Apollo from "./components/Apollo"
import { BrowserRouter as Router } from "react-router-dom"

import ReactDOM from "react-dom"
import { ROOT_ELEMENT } from "./globals"

import "./index.scss"

const Index = () => (
  <Apollo>
    <Router>
      <App/>
    </Router>
  </Apollo>
)

ReactDOM.render(<Index/>, ROOT_ELEMENT)
