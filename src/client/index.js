import React from "react"

import Pages from "./components/Pages"
import Header from "./components/Header"
import Apollo from "./components/Apollo"
import Player from "./components/Player"
import { BrowserRouter as Router } from "react-router-dom"

import { render } from "react-dom"
import { ROOT_ELEMENT } from "./globals"

import "./index.scss"

render(
  <Apollo>
    <Router>
      <Header/>
      <Pages/>
      <Player/>
    </Router>
  </Apollo>,
  ROOT_ELEMENT
)
