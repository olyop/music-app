import React from "react"

import { Switch, Route } from "react-router-dom"

import { shape, string } from "prop-types"
import routesConfig from "./routesConfig"
import reactBem from "@oly_op/react-bem"

import "./Catalog.scss"

const bem = reactBem("Catalog")

const Catalog = ({ match }) => (
  <div className={bem("")}>
    <Switch>
      {routesConfig.map(route => (
        <Route
          key={route.id}
          path={match.path + route.path}
          component={route.component}
        />
      ))}
    </Switch>
  </div>
)

Catalog.propTypes = {
  match: shape({ path: string.isRequired }).isRequired
}

export default Catalog
