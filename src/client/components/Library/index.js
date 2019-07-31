import React from "react"

import { Switch, Route, NavLink } from "react-router-dom"

import { Library as bem } from "../../globals/bem"
import routesLibrary from "./routesLibrary"
import { shape, string } from "prop-types"

import "./index.scss"

const Library = ({ match }) => (
  <section className={bem("")}>
    <div className={bem("header")}>
      <div className={bem("links")}>
        {routesLibrary.map(route => (
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
        {routesLibrary.map(route => (
          <Route
            exact
            key={route.key}
            component={route.component}
            path={match.path + route.path}
          />
        ))}
      </Switch>
    </div>
  </section>
)

Library.propTypes = {
  match: shape({ path: string.isRequired }).isRequired
}

export default Library
