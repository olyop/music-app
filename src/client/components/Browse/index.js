import React from "react"

import Navigation from "../Navigation"
import { Switch, Route } from "react-router-dom"

import routes from "./routes"
import { propTypes } from "./props"

const Browse = ({ match }) => (
  <div className="Space">
    <Navigation
      match={match}
      routes={routes}
      className="SpaceBottom"
    />
    <Switch>
      {routes.map(
        route => (
          <Route
            exact
            key={route.id}
            component={route.component}
            path={match.path + route.path}
          />
        ),
      )}
    </Switch>
  </div>
)

Browse.propTypes = propTypes

export default Browse
