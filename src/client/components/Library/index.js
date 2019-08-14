import React, { Fragment } from "react"

import { Switch, Route, NavLink } from "react-router-dom"
import Icon from "../Icon"

import routesConfig from "./routesConfig"
import { Library as bem } from "../../globals/bem"
import { shape, string } from "prop-types"

import "./index.scss"

const Library = ({ match }) => (
  <section className={bem("")}>
    <div className={bem("header")}>
      <div className={bem("links")}>
        {routesConfig.map(route => (
          <NavLink
            key={route.id}
            className={bem("link")}
            to={match.path + route.path}
            activeClassName={bem("active")}
            children={<Fragment>
              <Icon
                bem={bem}
                icon={route.icon}
                className="icon"
              />
              <span className={bem("text")}>{route.name}</span>
            </Fragment>}
          />
        ))}
      </div>
    </div>
    <div className={bem("main")}>
      <Switch>
        {routesConfig.map(route => (
          <Route
            exact
            key={route.id}
            component={route.component}
            path={match.path + route.path}
          />
        ))}
      </Switch>
    </div>
  </section>
)

Library.propTypes = {
  match: shape({ path: string.isRequired }).isRequired
}

export default Library
