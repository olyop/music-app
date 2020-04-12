import React from "react"

import UserContext from "../../contexts/User"

import { propTypes } from "./props"

const Authenticate = ({ children }) => (
  <UserContext.Provider value="5e868d45d8843a0064342318">
    {children}
  </UserContext.Provider>
)

Authenticate.propTypes = propTypes

export default Authenticate
