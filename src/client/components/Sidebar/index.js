import React from "react"

import { NavLink } from "react-router-dom"

import { Sidebar as bem } from "../../globals/bem"
import { func } from "prop-types"

import routesConfigPages from "../Pages/routesConfig"
import routesConfigCatalog from "../Catalog/routesConfig"
import routesConfigLibrary from "../Library/routesConfig"
import routesConfigCatalogAdd from "../Catalog/Add/routesConfig"

import "./index.scss"

const Sidebar = ({ toggleSidebar }) => (
  <div className={bem("")} onClick={toggleSidebar} role="button" tabIndex={0}>
    <aside className={bem("nav")}>
      <nav className={bem("routes")}>
        {routesConfigPages.map(route => (
          <div key={route.id} className={bem("route")}>
            <NavLink
              to={route.path}
              children={route.name}
              className={bem("link")}
            />
            {route.name === "Catalog" ? (
              routesConfigCatalog.map(subRoute => (
                <div key={subRoute.id} className={bem("subRoute")}>
                  <NavLink
                    className={bem("subLink")}
                    children={`- ${subRoute.name}`}
                    to={route.path + subRoute.path}
                  />
                  {routesConfigCatalogAdd.map(subSubRoute => (
                    <div key={subSubRoute.id} className={bem("subSubRoute")}>
                      <NavLink
                        className={bem("subSubLink")}
                        children={`- ${subSubRoute.name}`}
                        to={route.path + subRoute.path + subSubRoute.path}
                      />
                    </div>
                  ))}
                </div>
              ))
            ) : (
              routesConfigLibrary.map(subRoute => (
                <div key={subRoute.id} className={bem("subRoute")}>
                  <NavLink
                    className={bem("subLink")}
                    to={route.path + subRoute.path}
                    children={`- ${subRoute.name}`}
                  />
                </div>
              ))
            )}
          </div>
        ))}
      </nav>
    </aside>
  </div>
)

Sidebar.propTypes = {
  toggleSidebar: func.isRequired
}

export default Sidebar
