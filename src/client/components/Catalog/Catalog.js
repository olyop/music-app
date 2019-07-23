import React from "react"

import { NavLink, Switch, Route } from "react-router-dom"

import { Catalog as bem } from "../../globals/bem"
import { propTypes } from "./props"
import routes from "./routes"

import "./Catalog.scss"

const Catalog = ({ match }) => (
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
            path={match.path + route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </div>
  </div>
)

Catalog.propTypes = propTypes

export default Catalog
