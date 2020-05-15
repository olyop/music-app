import React, { useState } from "react"

import Pages from "../Pages"
import Header from "../Header"
import PlayerBar from "../PlayerBar"

import PlayContext from "../../contexts/Play"
import SidebarContext from "../../contexts/Sidebar"
import ListStyleContent from "../../contexts/ListStyle"

import { useLocalStorage } from "../../hooks"

import "./index.scss"

const Application = () => {

  const [ play, setPlay ] = useState(false)
  const [ sidebar, setSidebar ] = useLocalStorage("sidebar", "closed")
  const [ listStyle, setListStyle ] = useLocalStorage("listStyle", "grid")

  const toggleSidebar = () => {
    document.documentElement.style.setProperty(
      "--content-width",
      sidebar ? "100vw" : "calc(100vw - var(--sidebar-width))",
      "important",
    )
    setSidebar(prevState => (prevState === "open" ? "closed" : "open"))
  }

  return (
    <PlayContext.Provider value={{ play, setPlay }}>
      <SidebarContext.Provider value={{ sidebar, toggleSidebar }}>
        <ListStyleContent.Provider value={{ listStyle, setListStyle }}>
          <Header/>
          <Pages/>
          <PlayerBar />
        </ListStyleContent.Provider>
      </SidebarContext.Provider>
    </PlayContext.Provider>
  )
}

export default Application
