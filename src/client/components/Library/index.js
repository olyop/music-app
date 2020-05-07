import React from "react"

import Navigation from "../Navigation"
import { Switch, Route } from "react-router-dom"

import routes from "./routes"
import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("Library")

const Library = ({ match }) => (
  <section className={bem("")}>
    <h1 className={bem("title")}>Library</h1>
    <Navigation
      match={match}
      routes={routes}
    />
    <div className={bem("main")}>
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
  </section>
)

Library.propTypes = propTypes

export default Library
