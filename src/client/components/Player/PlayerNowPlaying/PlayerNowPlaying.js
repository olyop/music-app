import React, { useContext } from "react"

import Song from "../../Song"
import ApiError from "../../ApiError"
import UserCtx from "../../../ctx/user"

import { isUndefined } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import GET_USER_NOW_PLAYING from "./getUserNowPlaying.graphql"

const PlayerNowPlaying = () => {
  const { user } = useContext(UserCtx)
  const { id } = user
  const queryOptions = { variables: { id } }
  const { loading, error, data } = useQuery(GET_USER_NOW_PLAYING, queryOptions)
  if (loading) {
    return "Loading..."
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { nowPlaying } = data.user
    return <Song song={nowPlaying} />
  }
}

export default PlayerNowPlaying
