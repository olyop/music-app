import React, { Fragment } from "react"

import { NavLink } from "react-router-dom"

import { propTypes } from "./props"
import { animated } from "react-spring" 
import reactBem from "@oly_op/react-bem"

import routesPages from "../Pages/routes"
import routesCatalogAdd from "../Add/routes"
import routesCatalog from "../Catalog/routes"
import routesLibrary from "../Library/routes"
import routesCatalogBrowse from "../Browse/routes"

import "./Sidebar.scss"

const bem = reactBem("Sidebar")

const Sidebar = ({ style, toggleSidebar }) => (
  <animated.aside className={bem("")} style={style}>
    <nav className={bem("routes")}>
      {routesPages.map(
        route => (
          route.ignore ? undefined : (
            <div key={route.id} className={bem("route")}>
              <NavLink
                to={route.path}
                children={route.name}
                onClick={toggleSidebar}
                className={bem("link")}
              />
              {route.name === "Search" ? null : (
                <Fragment>
                  {route.name === "Catalog" ? (
                    routesCatalog.map(
                      subRoute => (
                        <div key={subRoute.id} className={bem("subRoute")}>
                          <NavLink
                            onClick={toggleSidebar}
                            className={bem("subLink")}
                            children={`- ${subRoute.name}`}
                            to={route.path + subRoute.path}
                          />
                          {subRoute.name === "Add" ? (
                            routesCatalogAdd.map(
                              subSubRoute => (
                                <div key={subSubRoute.id} className={bem("subSubRoute")}>
                                  <NavLink
                                    onClick={toggleSidebar}
                                    className={bem("subSubLink")}
                                    children={`- ${subSubRoute.name}`}
                                    to={route.path + subRoute.path + subSubRoute.path}
                                  />
                                </div>
                              ),
                            )
                          ) : (
                            routesCatalogBrowse.map(
                              subSubRoute => (
                                <div key={subSubRoute.id} className={bem("subSubRoute")}>
                                  <NavLink
                                    onClick={toggleSidebar}
                                    className={bem("subSubLink")}
                                    children={`- ${subSubRoute.name}`}
                                    to={route.path + subRoute.path + subSubRoute.path}
                                  />
                                </div>
                              ),
                            )
                          )}
                        </div>
                      ),
                    )
                  ) : (
                    routesLibrary.map(
                      subRoute => (
                        <div key={subRoute.id} className={bem("subRoute")}>
                          <NavLink
                            onClick={toggleSidebar}
                            className={bem("subLink")}
                            children={`- ${subRoute.name}`}
                            to={route.path + subRoute.path}
                          />
                        </div>
                      ),
                    )
                  )}
                </Fragment>
              )}
            </div>
          )
        ),
      )}
    </nav>
  </animated.aside>
)

Sidebar.propTypes = propTypes

export default Sidebar
