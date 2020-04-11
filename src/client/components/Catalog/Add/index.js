import React from "react"

import { NavLink, Switch, Route } from "react-router-dom"

import routes from "./routes"
import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("Add")

const Add = ({ match }) => (
  <div className={bem("")}>
    <div className={bem("nav")}>
      {routes.map(
        route => (
          <NavLink
            key={route.id}
            children={route.name}
            className={bem("nav-link")}
            to={match.path + route.path}
            activeClassName={bem("nav-active")}
          />
        ),
      )}
    </div>
    <div className={bem("form")}>
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
  </div>
)

Add.propTypes = propTypes

export default Add
