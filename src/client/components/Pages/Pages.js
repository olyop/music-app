import React from "react"

import { Switch, Route } from "react-router-dom"

import { Pages as bem } from "../../globals/bem"
import routesConfig from "./routesConfig"

import "./Pages.scss"

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
