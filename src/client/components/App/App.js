import React from "react"

import Pages from "../Pages"
import Header from "../Header"
import Player from "../Player"
import Loading from "../Loading"
import ApiError from "../ApiError"
import UserCtx from "../../ctx/user"

import id from "./id"
import { isUndefined } from "lodash"
import GET_USER from "./getUser.graphql"
import { useQuery } from "@apollo/react-hooks"

const App = () => {
  const userQueryOptions = { variables: { id } }
  const { data, loading, error } = useQuery(GET_USER, userQueryOptions)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { user } = data
    const userCtxInit = { user }
    return (
      <UserCtx.Provider value={userCtxInit}>
        <Header/>
        <Pages/>
        <Player/>
      </UserCtx.Provider>
    )
  }
}

export default App
