import React from "react"

import { Switch, Route } from "react-router-dom"

import routes from "./routes"
import { propTypes } from "./props"

const Catalog = ({ match }) => (
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
)

Catalog.propTypes = propTypes

export default Catalog
