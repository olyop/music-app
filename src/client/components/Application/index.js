import React, { useState } from "react"

import Pages from "../Pages"
import Header from "../Header"
import PlayerBar from "../PlayerBar"
import PlayContext from "../../contexts/Play"

import "./index.scss"

const Application = () => {
  const [ play, setPlay ] = useState(false)
  return (
    <PlayContext.Provider value={{ play, setPlay }}>
      <Header/>
      <Pages/>
      <PlayerBar/>
    </PlayContext.Provider>
  )
}

export default Application
