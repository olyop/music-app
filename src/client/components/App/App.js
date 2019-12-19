import React, { useState } from "react"

import Pages from "../Pages"
import Header from "../Header"
import Player from "../Player"
import UserContext from "../../context/UserContext"

import { propTypes } from "./props"

const App = ({ user }) => {
  const [ currentUser, setCurrentUser ] = useState(user)
  const userContextInit = { user: currentUser, setUser: setCurrentUser }
  return (
    <UserContext.Provider value={userContextInit}>
      <Header/>
      <Pages/>
      <Player/>
    </UserContext.Provider>
  )
}

App.propTypes = propTypes

export default App
