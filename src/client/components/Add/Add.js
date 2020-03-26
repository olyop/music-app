import React from "react"

import NestedRouter from "../NestedRouter"

import routes from "./routes"
import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./Add.scss"

const bem = reactBem("Add")

const Add = ({ match }) => (
  <div className={bem("")}>
    <NestedRouter
      routes={routes}
      path={match.path}
    />
  </div>
)

Add.propTypes = propTypes

export default Add
