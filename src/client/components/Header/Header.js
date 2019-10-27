import React, { useState } from "react"

import Sidebar from "../Sidebar"
import Icon from "../Icon"

import reactBEM from "@oly_op/react-bem"

import "./Header.scss"

const bem = reactBEM("Header")

const Header = () => {
  const [ sidebar, useSidebar ] = useState(false)
  const toggleSidebar = () => useSidebar(!sidebar)
  return <>
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
  </>
}

export default Header