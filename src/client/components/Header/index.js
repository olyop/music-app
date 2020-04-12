import React, { Fragment, useState } from "react"

import Icon from "../Icon"
import Sidebar from "./Sidebar"
import { NavLink } from "react-router-dom"

import reactBem from "@oly_op/react-bem"
import { useSpring } from "react-spring"

import "./index.scss"

const bem = reactBem("Header")

const duration = 250

const Header = () => {
  const [ sidebar, setSidebar ] = useState(false)
  const toggleSidebar = () => setSidebar(!sidebar)
  return (
    <Fragment>
      <header className={bem("")}>
        <Icon
          title="Menu"
          onClick={toggleSidebar}
          icon={sidebar ? "close" : "menu"}
          className={bem("hamburger", "icon")}
        />
        <div className={bem("right")}>
          <NavLink
            to="/search"
            className={bem("link")}
            children={(
              <Icon
                icon="search"
                title="Search"
                className={bem("right-search", "icon")}
              />
            )}
          />
          <Icon
            title="Account"
            icon="account_circle"
            className={bem("right-user", "icon")}
          />
        </div>
      </header>
      <Sidebar
        toggleSidebar={toggleSidebar}
        style={useSpring({ config: { duration }, left: sidebar ? 0 : -300 })}
      />
      {sidebar ? (
        <div
          tabIndex={0}
          role="button"
          title="Close"
          onClick={toggleSidebar}
          className={bem("close")}
        />
      ) : null}
    </Fragment>
  )
}

export default Header
