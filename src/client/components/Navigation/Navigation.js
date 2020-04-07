import React, { Fragment } from "react"

import Icon from "../Icon"
import { NavLink } from "react-router-dom"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./Navigation.scss"

const bem = reactBem("Navigation")

const Navigation = ({ match, routes, className }) => (
  <div className={bem({ ignore: true, className }, "")}>
    {routes.map(
      route => (
        <NavLink
          exact
          key={route.id}
          to={match.path + route.path}
          className={bem("link")}
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
      ),
    )}
  </div>
)

Navigation.propTypes = propTypes
Navigation.defaultProps = defaultProps

export default Navigation
