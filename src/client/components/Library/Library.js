import React, { Fragment } from "react"

import Icon from "../Icon"
import { NavLink } from "react-router-dom"
import NestedRouter from "../NestedRouter"

import routes from "./routes"
import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./Library.scss"

const bem = reactBem("Library")

const Library = ({ match }) => (
  <section className={bem("")}>
    <div className={bem("header")}>
      <div className={bem("links")}>
        {routes.map(
          route => (
            <NavLink
              key={route.id}
              className={bem("link")}
              to={match.path + route.path}
              activeClassName={bem("active")}
              children={(
                <Fragment>
                  <Icon
                    icon={route.icon}
                    className={bem("icon")}
                  />
                  <span
                    children={route.name}
                    className={bem("text")}
                  />
                </Fragment>
              )}
            />
          ),
        )}
      </div>
    </div>
    <div className={bem("main")}>
      <NestedRouter
        routes={routes}
        path={match.path}
      />
    </div>
  </section>
)

Library.propTypes = propTypes

export default Library
