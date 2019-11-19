import React from "react"

import { Switch, Route } from "react-router-dom"

import reactBem from "@oly_op/react-bem"
import { shape, string } from "prop-types"
import routesConfig from "./routesConfig"

import "./Add.scss"

const bem = reactBem("Add")

const Add = ({ match }) => (
  <div className={bem("")}>
    <Switch>
      {routesConfig.map(route => (
        <Route
          exact
          key={route.id}
          component={route.component}
          path={match.path + route.path}
        />
      ))}
    </Switch>
  </div>
)

Add.propTypes = {
  match: shape({ path: string.isRequired }).isRequired
}

export default Add
