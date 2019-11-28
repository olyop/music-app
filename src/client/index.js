import React from "react"

import { BrowserRouter as Router } from "react-router-dom"
import Apollo from "./components/Apollo"
import Header from "./components/Header"
import Pages from "./components/Pages"

import { ROOT_ELEMENT } from "./globals"
import { render } from "react-dom"

import "./index.scss"

render(
  <Apollo>
    <Router>
      <Header/>
      <Pages/>
    </Router>
  </Apollo>,
  ROOT_ELEMENT
)
