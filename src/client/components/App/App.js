import React, { useState } from "react"

import Pages from "../Pages"
import Header from "../Header"
import Player from "../Player"
import SongContext from "../../context/SongContext"

import init from "./init"

const App = () => {
  const [ song, setSong ] = useState(init)
  return (
    <SongContext.Provider value={{ song, setSong }}>
      <Header/>
      <Pages/>
      <Player/>
    </SongContext.Provider>
  )
}

export default App
