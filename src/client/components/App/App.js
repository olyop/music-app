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

const App = () => {
  const [ user, setUser ] = useState()
  const { loading, error, data } = useQuery(GET_USER)
  const [ updateNowPlaying ] = useMutation(UPDATE_NOW_PLAYING)
  const handleNowPlaying = id => async () => {
    const newSong = await updateNowPlaying(id)
    setUser(newSong)
  }
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    setUser(data.user)
    const userCtxInit = { user, setUser: handleNowPlaying }
    return (
      <UserCtx.Provider value={userCtxInit}>
        <Header loading={loading} />
        <Pages/>
        <Player/>
      </UserCtx.Provider>
    )
  }
}

export default App
