import React, { useState } from "react"

import AuthContext from "../../contexts/Auth"
import UserContext from "../../contexts/User"

import auth0 from "auth0-js"
import { propTypes } from "./props"

const webAuth = new auth0.WebAuth({
  scope: "openid profile email",
  responseType: "token id_token",
  domain: "dev-ttsv9wvu.au.auth0.com",
  redirectUri: "http://192.168.1.102:8080/",
  clientID: "10u3OKcXtg3l8FcoLsEflUNUdsM0pNHP",
})

const Authenticate = ({ children }) => {
  const [ auth ] = useState(webAuth) 
  return (
    <AuthContext.Provider value={auth}>
      <UserContext.Provider value="5e868d45d8843a0064342318">
        {children}
      </UserContext.Provider>
    </AuthContext.Provider>
  )
}

Authenticate.propTypes = propTypes

export default Authenticate
