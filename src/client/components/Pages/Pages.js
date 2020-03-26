import React from "react"

import NestedRouter from "../NestedRouter"

import routes from "./routes"
import reactBem from "@oly_op/react-bem"

import "./Pages.scss"

const bem = reactBem("Pages")

const Pages = () => (
  <main className={bem("")}>
    <NestedRouter routes={routes} />
  </main>
)

export default Pages
