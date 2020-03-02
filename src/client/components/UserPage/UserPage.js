import React from "react"

import { Switch, Route } from "react-router-dom"

import routes from "./routes"
import { propTypes } from "./props" 
import reactBem from "@oly_op/react-bem"

import "./UserPage.scss"

const bem = reactBem("UserPage")

const UserPage = ({ match }) => (
  <div className={bem("")}>
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
)

UserPage.propTypes = propTypes

export default UserPage
