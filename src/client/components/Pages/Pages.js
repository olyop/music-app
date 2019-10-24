import React from "react"

import { Switch, Route } from "react-router-dom"

import routesConfig from "./routesConfig"
import reactBEM from "@oly_op/react-bem"

import "./Pages.scss"

const bem = reactBEM("Pages")

const Pages = () => (
  <main className={bem("")}>
    <Switch>
      {routesConfig.map(route => (
        <Route
          key={route.id}
          path={route.path}
          component={route.component}
        />
      ))}
    </Switch>
  </main>
)

export default Pages
