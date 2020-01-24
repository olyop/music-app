import React, { Fragment, useState } from "react"

import Icon from "../Icon"
import Sidebar from "../Sidebar"
import { NavLink } from "react-router-dom"

import reactBem from "@oly_op/react-bem"
import { useSpring } from "react-spring" 
import { SIDEBAR_ANIMATION_LENGTH as duration } from "../../globals"

import "./Header.scss"

const bem = reactBem("Header")

const Header = () => {
  const [ sidebar, setSidebar ] = useState(false)
  const toggleSidebar = () => setSidebar(!sidebar)
  const style = useSpring({ config: { duration }, left: sidebar ? 0 : -300 })
  return (
    <Fragment>
      <header className={bem("")}>
        <Icon
          onClick={toggleSidebar}
          className={bem("hamburger")}
          icon={sidebar ? "close" : "menu"}
        />
        <NavLink to="/search">
          <Icon
            icon="search"
            className={bem("search")}
          />
        </NavLink>
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
