import React, { Fragment, useState } from "react"

import Icon from "../Icon"
import Sidebar from "../Sidebar"
import { NavLink } from "react-router-dom"

import reactBem from "@oly_op/react-bem"
import { useSpring } from "react-spring"

import "./Header.scss"

const bem = reactBem("Header")

const Header = () => {
  const [ sidebar, setSidebar ] = useState(false)
  const toggleSidebar = () => setSidebar(!sidebar)
  const style = useSpring({ config: { duration: 250 }, left: sidebar ? 0 : -300 })
  return (
    <Fragment>
      <header className={bem("")}>
        <Icon
          onClick={toggleSidebar}
          className={bem("hamburger")}
          icon={sidebar ? "close" : "menu"}
        />
        <div className={bem("right")}>
          <NavLink className={bem("link")} to="/search">
            <Icon
              icon="search"
              className={bem("icon")}
            />
          </NavLink>
          <NavLink className={bem("link")} to="/user">
            <Icon
              icon="account_circle"
              className={bem("icon")}
            />
          </NavLink>
        </div>
      </header>
      <Sidebar
        style={style}
        toggleSidebar={toggleSidebar}
      />
      {sidebar ? (
        <div
          role="button"
          tabIndex={0}
          onClick={toggleSidebar}
          className={bem("close")}
        />
      ) : null}
    </Fragment>
  )
}

export default Header
