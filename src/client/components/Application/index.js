import React, { useState } from "react"

import Pages from "../Pages"
import Header from "../Header"
import PlayerBar from "../PlayerBar"

import PlayContext from "../../contexts/Play"
import SidebarContext from "../../contexts/Sidebar"

import "./index.scss"

const Application = () => {

  const [ play, setPlay ] = useState(false)
  const [ sidebar, setSidebar ] = useState(false)

  const toggleSidebar = () => {
    document.documentElement.style.setProperty(
      "--content-width",
      sidebar ? "100vw" : "calc(100vw - var(--sidebar-width))",
    )
    setSidebar(!sidebar)
  }

  return (
    <PlayContext.Provider value={{ play, setPlay }}>
      <SidebarContext.Provider value={{ sidebar, toggleSidebar }}>
        <Header/>
        <Pages/>
        <PlayerBar />
      </SidebarContext.Provider>
    </PlayContext.Provider>
  )
}

export default Application
