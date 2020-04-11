import React, { Fragment } from "react"

import Logo from "../Logo"
import Icon from "../../Icon"
import { NavLink } from "react-router-dom"

import { propTypes } from "./props"
import { animated } from "react-spring"
import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("Sidebar")

const Sidebar = ({ style, toggleSidebar }) => (
  <animated.aside className={bem("")} style={style}>
    <nav className={bem("routes")}>
      <NavLink
        to="/"
        onClick={toggleSidebar}
        className={bem("logo-link")}
        children={<Logo className={bem("logo")} />}
      />
      <NavLink
        to="/catalog/browse"
        onClick={toggleSidebar}
        className={bem("route")}
        children={(
          <Fragment>
            <Icon className={bem("route-icon")} icon="view_list" />
            <p className={bem("route-text")}>Browse</p>
          </Fragment>
        )}
      />
      <NavLink
        to="/library/songs"
        onClick={toggleSidebar}
        className={bem("route")}
        children={(
          <Fragment>
            <Icon className={bem("route-icon")} icon="library_music" />
            <p className={bem("route-text")}>Library</p>
          </Fragment>
        )}
      />
      <NavLink
        onClick={toggleSidebar}
        to="/catalog/add/artist"
        className={bem("route")}
        children={(
          <Fragment>
            <Icon className={bem("route-icon")} icon="add_circle" />
            <p className={bem("route-text")}>Add Music</p>
          </Fragment>
        )}
      />
    </nav>
  </animated.aside>
)

Sidebar.propTypes = propTypes

export default Sidebar
