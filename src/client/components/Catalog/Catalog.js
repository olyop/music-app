import React from "react"

import { Switch, Route } from "react-router-dom"

import routes from "./routes"
import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./Catalog.scss"

const bem = reactBem("Catalog")

const Catalog = ({ match }) => (
  <div className={bem("")}>
    <Switch>
      {routes.map(
        route => (
          <Route
            key={route.id}
            component={route.component}
            path={match.path + route.path}
          />
        ),
      )}
    </Switch>
  </div>
)

Catalog.propTypes = propTypes

export default Catalog
