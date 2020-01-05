import React from "react"

import { NavLink } from "react-router-dom"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import routesPages from "../Pages/routes"
import routesCatalog from "../Catalog/routes"
import routesLibrary from "../Library/routes"
import routesCatalogAdd from "../Catalog/Add/routes"
import routesCatalogBrowse from "../Catalog/Browse/routes"

import "./Sidebar.scss"

const bem = reactBem("Sidebar")

const Sidebar = ({ toggle }) => (
  <div className={bem("")} onClick={toggle} role="button" tabIndex={0}>
    <aside className={bem("nav")}>
      <nav className={bem("routes")}>
        {routesPages.map(
          route => (
            route.ignore ? undefined : (
              <div key={route.id} className={bem("route")}>
                <NavLink
                  to={route.path}
                  children={route.name}
                  className={bem("link")}
                />
                {route.name === "Catalog" ? (
                  routesCatalog.map(
                    subRoute => (
                      <div key={subRoute.id} className={bem("subRoute")}>
                        <NavLink
                          className={bem("subLink")}
                          children={`- ${subRoute.name}`}
                          to={route.path + subRoute.path}
                        />
                        {subRoute.name === "Add To Catalog" ? (
                          routesCatalogAdd.map(
                            subSubRoute => (
                              <div key={subSubRoute.id} className={bem("subSubRoute")}>
                                <NavLink
                                  className={bem("subSubLink")}
                                  children={`- ${subSubRoute.name}`}
                                  to={route.path + subRoute.path + subSubRoute.path}
                                />
                              </div>
                            )
                          )
                        ) : (
                          routesCatalogBrowse.map(
                            subSubRoute => (
                              <div key={subSubRoute.id} className={bem("subSubRoute")}>
                                <NavLink
                                  className={bem("subSubLink")}
                                  children={`- ${subSubRoute.name}`}
                                  to={route.path + subRoute.path + subSubRoute.path}
                                />
                              </div>
                            )
                          )
                        )}
                      </div>
                    )
                  )
                ) : (
                  routesLibrary.map(
                    subRoute => (
                      <div key={subRoute.id} className={bem("subRoute")}>
                        <NavLink
                          className={bem("subLink")}
                          children={`- ${subRoute.name}`}
                          to={route.path + subRoute.path}
                        />
                      </div>
                    )
                  )
                )}
              </div>
            )
          )
        )}
      </nav>
    </aside>
  </div>
)

Sidebar.propTypes = propTypes

export default Sidebar
