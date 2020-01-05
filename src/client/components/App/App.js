import React from "react"

import Pages from "../Pages"
import Header from "../Header"
import Player from "../Player"
import Loading from "../Loading"
import ApiError from "../ApiError"
import UserCtx from "../../ctx/user"

import { isUndefined } from "lodash"
import GET_USER from "./getUser.graphql"
import UPDATE_NOW_PLAYING from "./updateNowPlaying.graphql"
import { useQuery, useMutation } from "@apollo/react-hooks"

const id = "5dfacf7d106b6402ac9d3375"

const App = () => {
  const userQueryOptions = { variables: { id } }
  const [ handleNowPlaying ] = useMutation(UPDATE_NOW_PLAYING)
  const { data, loading, error, client } = useQuery(GET_USER, userQueryOptions)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { user } = data
    const { id: userId } = user
    const updateNowPlaying = nowPlaying => {
      const { id: songId } = nowPlaying
      handleNowPlaying({ variables: { userId, songId } })
      client.writeQuery({
        query: GET_USER,
        data: { user: { ...user, nowPlaying } },
      })
    }
    const userCtxInit = { user, updateNowPlaying }
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
