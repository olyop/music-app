import React from "react"

import { NavLink } from "react-router-dom"

import { Sidebar as bem } from "../../globals/bem"
import { func } from "prop-types"

import routesConfigPages from "../Pages/routesConfig"
import routesConfigCatalog from "../Catalog/routesConfig"
import routesConfigLibrary from "../Library/routesConfig"

import "./index.scss"

const Sidebar = ({ toggleSidebar }) => (
  <aside className={bem("")}>
    <nav className={bem("nav")}>
      <div className={bem("links")}>
        {routesConfigPages.map(route => (
          <div className={bem("linkRoute")} key={route.id}>
            <NavLink
              key={route.id}
              to={route.path}
              children={route.name}
              className={bem("link")}
              onClick={toggleSidebar}
            />
            {route.name === "Catalog" ? (
              routesConfigCatalog.map(subRoute => (
                <NavLink
                  key={subRoute.id}
                  onClick={toggleSidebar}
                  className={bem("subLink")}
                  to={route.path + subRoute.path}
                  children={`- ${subRoute.name}`}
                />
              ))
            ) : (
              routesConfigLibrary.map(subRoute => (
                <NavLink
                  key={subRoute.id}
                  onClick={toggleSidebar}
                  className={bem("subLink")}
                  to={route.path + subRoute.path}
                  children={`- ${subRoute.name}`}
                />
              ))
            )}
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
