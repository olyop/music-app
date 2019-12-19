import React from "react"

import Login from "./components/Login"
import Apollo from "./components/Apollo"
import { BrowserRouter as Router } from "react-router-dom"

import { render } from "react-dom"
import { ROOT_ELEMENT } from "./globals"

import "./index.scss"

const Index = () => (
  <Apollo>
    <Router>
      <Login/>
    </Router>
  </Apollo>
)

render(<Index/>, ROOT_ELEMENT)
