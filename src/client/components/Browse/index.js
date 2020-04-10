import React from "react"

import Navigation from "../Navigation"
import { Switch, Route } from "react-router-dom"

import routes from "./routes"
import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("Browse")

const Browse = ({ match }) => (
  <div className={bem("")}>
    <Navigation
      match={match}
      routes={routes}
      ignore={["Home"]}
    />
    <div className={bem("main")}>
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
  </div>
)

Browse.propTypes = propTypes

export default Browse
