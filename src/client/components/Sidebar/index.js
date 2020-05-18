import React, { useContext } from "react"

import Icon from "../Icon"
import { NavLink } from "react-router-dom"
import SidebarContext from "../../contexts/Sidebar"

import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("Sidebar")

const Sidebar = () => {
  const { toggleSidebar } = useContext(SidebarContext)
  return (
    <nav className={bem("")}>
      <NavLink
        title="Browse"
        to="/catalog/browse"
        onClick={toggleSidebar}
        className={bem("route")}
      >
        <Icon className={bem("route-icon")} icon="view_list" />
        <p className={bem("route-text")}>Browse</p>
      </NavLink>
      <NavLink
        title="Library"
        to="/library/songs"
        onClick={toggleSidebar}
        className={bem("route")}
      >
        <Icon className={bem("route-icon")} icon="library_music" />
        <p className={bem("route-text")}>Library</p>
      </NavLink>
      <NavLink
        to="/addAlbum"
        title="Add Music"
        onClick={toggleSidebar}
        className={bem("route")}
      >
        <Icon className={bem("route-icon")} icon="add_circle" />
        <p className={bem("route-text")}>Add Music</p>
      </NavLink>
    </nav>
  )
}

export default Sidebar
