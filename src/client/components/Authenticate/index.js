import React from "react"

import UserContext from "../../contexts/User"

import { propTypes } from "./props"

const Authenticate = ({ children }) => (
  <UserContext.Provider value="20812980-e4af-4683-8f2d-bd7efbde01df">
    {children}
  </UserContext.Provider>
)

Authenticate.propTypes = propTypes

export default Authenticate
