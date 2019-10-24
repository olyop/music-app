import React from "react"

import { BrowserRouter as ReactRouter } from "react-router-dom"
import Apollo from "./components/Apollo"
import Header from "./components/Header"
import Pages from "./components/Pages"

import { ROOT_ELEMENT } from "./globals"
import { render } from "react-dom"

import reactBEM from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBEM("foo")
const test = foo("bar")
console.log(test)

render(
  <Apollo>
    <ReactRouter>
      <Header/>
      <Pages/>
    </ReactRouter>
  </Apollo>,
  ROOT_ELEMENT
)
