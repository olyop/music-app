import React from "react"

import { NavLink } from "react-router-dom"

import { Sidebar as bem } from "../../globals/bem"
import { func } from "prop-types"

import routesPages from "../Pages/routesPages"
import routesCatalog from "../Catalog/routesCatalog"
import routesLibrary from "../Library/routesLibrary"

import "./index.scss"

const Sidebar = ({ toggleSidebar }) => (
  <aside className={bem("")}>
    <nav className={bem("nav")}>
      <div className={bem("links")}>
        {routesPages.map(route => (
          <div className={bem("linkRoute")} key={route.key}>
            <NavLink
              to={route.path}
              children={route.name}
              className={bem("link")}
              onClick={toggleSidebar}
            />
            {route.name === "Catalog" ? routesCatalog.map(subRoute => (
              <NavLink
                key={subRoute.key}
                onClick={toggleSidebar}
                className={bem("subLink")}
                to={route.path + subRoute.path}
                children={`- ${subRoute.name}`}
              />
            )) : routesLibrary.map(subRoute => (
              <NavLink
                key={subRoute.key}
                onClick={toggleSidebar}
                className={bem("subLink")}
                to={route.path + subRoute.path}
                children={`- ${subRoute.name}`}
              />
            ))}
          </div>
        ))}
      </div>
    </nav>
  </aside>
)

Sidebar.propTypes = {
  toggleSidebar: func.isRequired
}

export default Sidebar
