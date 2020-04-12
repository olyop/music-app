import React, { useState, useEffect } from "react"

import UserContext from "../../contexts/User"

import { toString } from "lodash"
import { WebAuth } from "auth0-js"
import { propTypes } from "./props"
import { useHistory } from "react-router-dom"

import { WEB_AUTH_OPTIONS } from "../../globals"

const Authenticate = ({ children }) => {

  const history = useHistory()
  const [ auth ] = useState(new WebAuth(WEB_AUTH_OPTIONS))

  const isAuthenticated = () => {
    return Date.now() < localStorage.getItem("expiresAt")
  }

  const setSession = res => {
    localStorage.setItem("idToken", res.idToken)
    localStorage.setItem("accessToken", res.accessToken)
    localStorage.setItem("expiresAt", toString(res.expiresIn * 1000 + Date.now()))
  }

  const parseHash = (err, hash) => {
    if (!err && hash && hash.accessToken && hash.idToken) {
      setSession(hash)
      history.push("/")
    }
  }

  const handleAuthentication = (err, res) => {
    if (!err) {
      auth.parseHash({ hash: res }, parseHash)
    }
  }

  useEffect(() => {
    if (!isAuthenticated()) {
      auth.popup.authorize(handleAuthentication)
    }
  })

  return isAuthenticated() ? (
    <UserContext.Provider value="5e868d45d8843a0064342318">
      {children}
    </UserContext.Provider>
  ) : null
}

Authenticate.propTypes = propTypes

export default Authenticate
