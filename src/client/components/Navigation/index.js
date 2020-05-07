import React, { Fragment } from "react"

import Icon from "../Icon"
import { NavLink } from "react-router-dom"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./index.scss"

const bem = reactBem("Navigation")

const Navigation = ({ match, routes, className }) => (
  <nav className={bem(className, "")}>
    {routes.map(
      route => (route.ignore ? null : (
        <NavLink
          exact
          key={route.id}
          className={bem("link")}
          to={match.path + route.path}
          activeClassName={bem("active")}
          children={(
            <Fragment>
              <Icon
                icon={route.icon}
                className={bem("link-icon")}
              />
              <span
                children={route.name}
                className={bem("link-text")}
              />
            </Fragment>
          )}
        />
      )),
    )}
  </nav>
)

Navigation.propTypes = propTypes
Navigation.defaultProps = defaultProps

export default Navigation
