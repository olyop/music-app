import React, { useState, Fragment } from "react"

import Sidebar from "../Sidebar"
import Icon from "../Icon"

import reactBem from "@oly_op/react-bem"

import "./Header.scss"

const bem = reactBem("Header")

const Header = () => {
  const [ sidebar, useSidebar ] = useState(false)
  const toggleSidebar = () => useSidebar(!sidebar)
  return (
    <Fragment>
      <header className={bem("")}>
        <Icon
          bem={bem}
          tabIndex={0}
          role="button"
          className="hamburger"
          onClick={toggleSidebar}
          icon={sidebar ? "close" : "menu"}
        />
      </header>
      {sidebar ? <Sidebar toggleSidebar={toggleSidebar} /> : null}
    </Fragment>
  )
}

export default Header
