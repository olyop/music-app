import React from "react"

import { Switch, Route, NavLink } from "react-router-dom"

import { Library as bem } from "../../globals/bem"
import { propTypes } from "./props"
import routes from "./routes"

import "./Library.scss"

const Library = ({ match }) => (
  <div className={bem("")}>
    <div className={bem("header")}>
      <div className={bem("links")}>
        {routes.map(route => (
          <NavLink
            key={route.key}
            children={route.name}
            className={bem("link")}
            to={match.path + route.path}
          />
        ))}
      </div>
    </div>
    <div className={bem("main")}>
      <Switch>
        {routes.map(route => (
          <Route
            exact
            key={route.key}
            component={route.component}
            path={match.path + route.path}
          />
        ))}
      </Switch>
    </div>
  </div>
)

Library.propTypes = propTypes

export default Library
