import React from "react"

import { Switch, Route } from "react-router-dom"
import Sidebar from "../Sidebar"

import { Pages as bem } from "../../globals/bem"
import { propTypes } from "./props"
import routes from "./routes"

import "./Pages.scss"

const Pages = ({ sidebar }) => (
  <main className={bem("")}>
    {sidebar ? <Sidebar/> : null}
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

Pages.propTypes = propTypes

export default Pages
