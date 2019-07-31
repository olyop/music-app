import React from "react"

import { NavLink, Switch, Route } from "react-router-dom"

import { Catalog as bem } from "../../globals/bem"
import routesCatalog from "./routesCatalog"
import { shape, string } from "prop-types"

import "./index.scss"

const Catalog = ({ match }) => (
  <section className={bem("")}>
    <div className={bem("header")}>
      <div className={bem("links")}>
        {routesCatalog.map(route => (
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
        {routesCatalog.map(route => (
          <Route
            exact
            key={route.key}
            path={match.path + route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </div>
  </section>
)

Catalog.propTypes = {
  match: shape({ path: string.isRequired }).isRequired
}

export default Catalog
