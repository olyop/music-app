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
      <nav className={bem("links")}>
        {routesConfigPages.map(route => (
          <div className={bem("linkRoute")} key={route.id}>
            <NavLink
              key={route.id}
              to={route.path}
              children={route.name}
              className={bem("link")}
            />
            {route.name === "Catalog" ? (
              routesConfigCatalog.map(subRoute => <>
                <NavLink
                  key={subRoute.id}
                  className={bem("subLink")}
                  children={`- ${subRoute.name}`}
                  to={route.path + subRoute.path}
                />
                {routesConfigCatalogAdd.map(subSubRoute => (
                  <NavLink
                    key={subSubRoute.id}
                    className={bem("subSubRoute")}
                    children={`- ${subSubRoute.name}`}
                    to={route.path + subRoute.path + subSubRoute.path}
                  />
                ))}
              </>)
            ) : (
              routesConfigLibrary.map(subRoute => (
                <NavLink
                  key={subRoute.id}
                  className={bem("subLink")}
                  to={route.path + subRoute.path}
                  children={`- ${subRoute.name}`}
                />
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
