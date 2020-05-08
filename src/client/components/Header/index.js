import React, { useContext } from "react"

import Icon from "../Icon"
import { NavLink } from "react-router-dom"
import SidebarContext from "../../contexts/Sidebar"

import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("Header")

const Header = () => {
  const { sidebar, toggleSidebar } = useContext(SidebarContext)
  return (
    <header className={bem("", "Elevated")}>
      <Icon
        title="Menu"
        onClick={toggleSidebar}
        icon={sidebar ? "close" : "menu"}
        className={bem("hamburger", "icon", "IconHover")}
      />
      <div className={bem("right")}>
        <NavLink
          to="/search"
          className={bem("link")}
          children={(
            <Icon
              icon="search"
              title="Search"
              className={bem("search", "icon", "IconHover")}
            />
          )}
        />
        <NavLink
          to="/user"
          className={bem("link")}
          children={(
            <Icon
              title="Account"
              icon="account_circle"
              className={bem("icon", "IconHover")}
            />
          )}
        />
      </div>
    </header>
  )
}

export default Header
