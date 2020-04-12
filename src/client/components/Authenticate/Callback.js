import React, { useEffect, useContext } from "react"

import Spinner from "../Spinner"
import AuthContext from "../../contexts/Auth"

import { useLocation } from "react-router-dom"

const Callback = () => {
  const location = useLocation()
  const { handleAuthentication } = useContext(AuthContext)
  useEffect(() => { handleAuthentication(location) })
  return <Spinner/>
}

export default Callback
