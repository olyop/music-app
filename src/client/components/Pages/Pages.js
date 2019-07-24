import React from "react"

import { Switch, Route } from "react-router-dom"

import { Pages as bem } from "../../globals/bem"
import routes from "./routes"

import "./Pages.scss"

const Pages = () => (
  <main className={bem("")}>
    <Switch>
      {routes.map(route => (
        <Route
          key={route.key}
          path={route.path}
          component={route.component}
        />
      ))}
    </Switch>
  </main>
)

export default Pages
