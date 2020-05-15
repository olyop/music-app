import React, { useContext, Fragment } from "react"

import Icon from "../Icon"
import { NavLink } from "react-router-dom"
import SidebarContext from "../../contexts/Sidebar"

import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("Sidebar")

const Sidebar = () => {
  const { toggleSidebar } = useContext(SidebarContext)
  return (
    <aside className={bem("")}>
      <nav className={bem("routes")}>
        <NavLink
          to="/catalog/browse"
          onClick={toggleSidebar}
          className={bem("route")}
          children={(
            <Fragment>
              <Icon className={bem("route-icon")} icon="view_list" />
              <p className={bem("route-text")}>Browse</p>
            </Fragment>
          )}
        />
        <NavLink
          to="/library/songs"
          onClick={toggleSidebar}
          className={bem("route")}
          children={(
            <Fragment>
              <Icon className={bem("route-icon")} icon="library_music" />
              <p className={bem("route-text")}>Library</p>
            </Fragment>
          )}
        />
        <NavLink
          to="/addAlbum"
          onClick={toggleSidebar}
          className={bem("route")}
          children={(
            <Fragment>
              <Icon className={bem("route-icon")} icon="add_circle" />
              <p className={bem("route-text")}>Add Music</p>
            </Fragment>
          )}
        />
      </nav>
    </aside>
  )
}

export default Sidebar
