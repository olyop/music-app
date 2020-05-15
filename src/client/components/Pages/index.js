import React, { useContext } from "react"

import Sidebar from "../Sidebar"
import { Switch, Route } from "react-router-dom"
import SidebarContext from "../../contexts/Sidebar"

import routes from "./routes"
import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("Pages")

const Pages = () => {
  const { sidebar } = useContext(SidebarContext)
  return (
    <main className={bem("")}>
      {sidebar === "open" ? <Sidebar /> : null}
      <div className={bem("content")}>
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
      </div>
    </main>
  )
}

export default Pages
