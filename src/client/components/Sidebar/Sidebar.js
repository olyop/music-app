import React from "react"

import { NavLink } from "react-router-dom"

import { Sidebar as bem } from "../../globals/bem"
import routes from "../Pages/routes"

import "./Sidebar.scss"

const Sidebar = () => (
  <div className={bem("")}>
    <div className={bem("nav")}>
      <div className={bem("links")}>
        {routes.map(route => (
          <NavLink
            to={route.path}
            key={route.key}
            children={route.name}
            className={bem("link")}
          />
        ))}
      </div>
    </div>
  </div>
)

export default Sidebar
