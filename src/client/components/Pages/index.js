import React from "react"

import { Switch, Route } from "react-router-dom"

import routes from "./routes"
import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("Pages")

const Pages = () => (
  <main className={bem("")}>
    <Switch>
      {routes.map(
        route => (
          <Route
            key={route.id}
            path={route.path}
            component={route.component}
          />
        ),
      )}
    </Switch>
  </main>
)

export default Pages
