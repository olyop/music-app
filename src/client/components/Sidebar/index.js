import React, { useContext, Fragment } from "react"

import Icon from "../Icon"
import { NavLink } from "react-router-dom"
import SidebarContext from "../../contexts/Sidebar"

import "./index.scss"

const Sidebar = () => {
  const { toggleSidebar } = useContext(SidebarContext)
  return (
    <aside className="Sidebar">
      <nav className="Sidebar__routes">
        <NavLink
          to="/catalog/browse"
          onClick={toggleSidebar}
          className="Sidebar__route"
          children={(
            <Fragment>
              <Icon className="Sidebar__route-icon" icon="view_list" />
              <p className="Sidebar__route-text">Browse</p>
            </Fragment>
          )}
        />
        <NavLink
          to="/library/songs"
          onClick={toggleSidebar}
          className="Sidebar__route"
          children={(
            <Fragment>
              <Icon className="Sidebar__route-icon" icon="library_music" />
              <p className="Sidebar__route-text">Library</p>
            </Fragment>
          )}
        />
        <NavLink
          onClick={toggleSidebar}
          to="/catalog/add/artist"
          className="Sidebar__route"
          children={(
            <Fragment>
              <Icon className="Sidebar__route-icon" icon="add_circle" />
              <p className="Sidebar__route-text">Add Music</p>
            </Fragment>
          )}
        />
      </nav>
    </aside>
  )
}

export default Sidebar
