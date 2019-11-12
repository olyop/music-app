import React from "react"

import { NavLink, Switch, Route } from "react-router-dom"

import { shape, string } from "prop-types"
import routesConfig from "./routesConfig"
import reactBem from "@oly_op/react-bem"

import "./Catalog.scss"

const bem = reactBem("Catalog")

const Catalog = ({ match }) => (
  <div className={bem("")}>
    <div className={bem("header")}>
      <div className={bem("links")}>
        {routesConfig.map(route => (
          <NavLink
            key={route.id}
            children={route.name}
            className={bem("link")}
            to={match.path + route.path}
          />
        ))}
      </div>
    </div>
    <div className={bem("main")}>
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
  </div>
)

Catalog.propTypes = {
  match: shape({ path: string.isRequired }).isRequired
}

export default Catalog
