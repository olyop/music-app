import React, { useState } from "react"

import Sidebar from "../Sidebar"
import Icon from "../Icon"

import { Header as bem } from "../../globals/bem"

import "./index.scss"

const Header = () => {
  const [ sidebar, useSidebar ] = useState(false)
  const toggleSidebar = () => useSidebar(!sidebar)
  return (
    <header className={bem("")}>
      {sidebar ? <Sidebar toggleSidebar={toggleSidebar} /> : null}
      <Icon
        bem={bem}
        className="hamburger"
        onClick={toggleSidebar}
        icon={sidebar ? "close" : "menu"}
      />
    </header>
  )
}

export default Header
