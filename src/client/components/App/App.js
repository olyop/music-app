import React from "react"

import Pages from "../Pages"
import Header from "../Header"
import Player from "../Player"
import Loading from "../Loading"
import ApiError from "../ApiError"
import UserContext from "../../context/UserContext"

import { isUndefined } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_USER from "./getUser.graphql"

const queryOptions = { variables: { id: "5dfacf7d106b6402ac9d3375" } }

const App = () => {
  const { loading, error, data } = useQuery(GET_USER, queryOptions)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { user } = data
    const userContextInit = { user }
    return (
      <UserContext.Provider value={userContextInit}>
        <Header/>
        <Pages/>
        <Player/>
      </UserContext.Provider>
    )
  }
}

export default App
