import React from "react"

import NestedRouter from "../NestedRouter"

import routes from "./routes"
import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./Catalog.scss"

const bem = reactBem("Catalog")

const Catalog = ({ match }) => (
  <div className={bem("")}>
    <NestedRouter
      routes={routes}
      path={match.path}
    />
  </div>
)

Catalog.propTypes = propTypes

export default Catalog
