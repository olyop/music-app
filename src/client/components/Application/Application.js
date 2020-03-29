import React, { useState } from "react"

import Pages from "../Pages"
import Header from "../Header"
// import Player from "../Player"
import Loading from "../Loading"
import ApiError from "../ApiError"
import PlayerBar from "../PlayerBar"
// import { Switch, Route } from "react-router-dom"

import UserContext from "../../contexts/User"
import PlayContext from "../../contexts/Play"

import { isUndefined } from "lodash"
import { USER_ID } from "../../globals"
import { useQuery } from "@apollo/react-hooks"

import GET_USER from "../../graphql/queries/getUser.graphql"

const Application = () => {
  const [ play, setPlay ] = useState(false)
  const variables = { id: USER_ID }
  const { data, loading, error } = useQuery(GET_USER, { variables })
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    return (
      <UserContext.Provider value={data.user}>
        <PlayContext.Provider value={{ play, setPlay }}>
          <Header/>
          <Pages/>
          <PlayerBar/>
        </PlayContext.Provider>
      </UserContext.Provider>
    )
  }
}

export default Application
