import React from "react"

import Navigation from "../Navigation"
import { Switch, Route } from "react-router-dom"

import routes from "./routes"
import { propTypes } from "./props"

import "./index.scss"

const Browse = ({ match }) => (
  <div className="Browse">
    <Navigation
      match={match}
      routes={routes}
      className="Browse__nav"
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
