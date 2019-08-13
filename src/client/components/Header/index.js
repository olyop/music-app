import React, { useState, Fragment } from "react"

import Sidebar from "../Sidebar"
import Icon from "../Icon"

import { Header as bem } from "../../globals/bem"

import "./index.scss"

const Header = () => {
  const [ sidebar, useSidebar ] = useState(false)
  const toggleSidebar = () => useSidebar(!sidebar)
  return <Fragment>
    <header className={bem("")}>
      <Icon
        bem={bem}
        className="hamburger"
        onClick={toggleSidebar}
        icon={sidebar ? "close" : "menu"}
      />
    </header>
    {sidebar ? <Sidebar toggleSidebar={toggleSidebar} /> : null}
  </Fragment>
}

export default Header
