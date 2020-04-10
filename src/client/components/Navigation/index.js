import React, { Fragment } from "react"

import Icon from "../Icon"
import { NavLink } from "react-router-dom"

import { includes } from "lodash"
import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"

import "./index.scss"

const bem = reactBem("Navigation")

const Navigation = ({ match, routes, ignore, className }) => (
  <div className={bem({ ignore: true, className }, "")}>
    {routes.map(
      route => (includes(ignore, route.name) ? null : (
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
  </div>
)

Navigation.propTypes = propTypes
Navigation.defaultProps = defaultProps

export default Navigation
