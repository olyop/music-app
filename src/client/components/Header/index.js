import React, { useContext } from "react"

import Icon from "../Icon"
import { NavLink } from "react-router-dom"
import SidebarContext from "../../contexts/Sidebar"

import "./index.scss"

const Header = () => {
  const { sidebar, toggleSidebar } = useContext(SidebarContext)
  return (
    <header className="Header Elevated">
      <Icon
        title="Menu"
        onClick={toggleSidebar}
        icon={sidebar ? "close" : "menu"}
        className="Header__hamburger Header__icon IconHover"
      />
      <div className="Header__right">
        <NavLink
          to="/search"
          className="Header__link"
          children={(
            <Icon
              icon="search"
              title="Search"
              className="Header__search Header__icon IconHover"
            />
          )}
        />
        <Icon
          title="Account"
          icon="account_circle"
          className="Header__icon IconHover"
        />
      </div>
    </header>
  )
}

export default Header
