import React from "react"

import UserContext from "../../contexts/User"

import { propTypes } from "./props"

const Authenticate = ({ children }) => (
  <UserContext.Provider value={process.env.USER_ID}>
    {children}
  </UserContext.Provider>
)

Authenticate.propTypes = propTypes

export default Authenticate
