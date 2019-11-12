import React from "react"

import { NavLink, Switch, Route } from "react-router-dom"

import reactBem from "@oly_op/react-bem"
import { shape, string } from "prop-types"
import routesConfig from "./routesConfig"

import "./Add.scss"

const bem = reactBem("Add")

const Add = ({ match }) => (
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
      <div className={bem("content")}>
        <Switch>
          {routesConfig.map(route => (
            <Route
              exact
              key={route.id}
              component={route.component}
              path={match.path + route.path}
            />
          ))}
        </Switch>
      </div>
    </div>
  </div>
)

Add.propTypes = {
  match: shape({ path: string.isRequired }).isRequired
}

export default Add
