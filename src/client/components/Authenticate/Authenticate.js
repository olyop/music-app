import React from "react"

import UserContext from "../../contexts/User"

import { node } from "prop-types"
import { USER_ID } from "../../globals"

const Authenticate = ({ children }) => (
  <UserContext.Provider value={USER_ID}>
    {children}
  </UserContext.Provider>
)

Authenticate.propTypes = {
  children: node.isRequired,
}

export default Authenticate
