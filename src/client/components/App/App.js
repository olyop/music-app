import React from "react"

import Pages from "../Pages"
import Header from "../Header"
import Player from "../Player"
import Loading from "../Loading"
import ApiError from "../ApiError"
import UserCtx from "../../ctx/user"

import { isUndefined } from "lodash"
import USER_SUBSCRIBE from "./userSubscribe.graphql"
import UPDATE_NOW_PLAYING from "./updateNowPlaying.graphql"
import { useSubscription, useMutation } from "@apollo/react-hooks"

const id = "5dfacf7d106b6402ac9d3375"

const App = () => {
  const options = { variables: { id } }
  const { data, loading: subLoading, error } = useSubscription(USER_SUBSCRIBE, options)
  const [ updateNowPlaying, { loading: nowPlayingLoading } ] = useMutation(UPDATE_NOW_PLAYING)
  if (subLoading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { user } = data
    const { id: userId } = user
    const handleNowPlaying = songId => updateNowPlaying({ variables: { userId, songId } })
    const userCtxInit = { user, handleNowPlaying, nowPlayingLoading }
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
