import React, { useContext } from "react"

import Song from "../Song"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import UserCtx from "../../ctx/User"

import { isUndefined } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_NOW_PLAYING from "../../graphql/queries/getNowPlaying.graphql"
import USER_NOW_PLAYING_FRAG from "../../graphql/fragments/userNowPlayingFrag.graphql"

const NowPlaying = () => {
  const user = useContext(UserCtx)
  const { id } = user
  const queryOptions = { variables: { id } }
  const { loading, error, data, client } = useQuery(GET_NOW_PLAYING, queryOptions)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { nowPlaying } = data.user
    const fragment = USER_NOW_PLAYING_FRAG
    const userFrag = { nowPlaying, __typename: "User" }
    client.writeFragment({ id, fragment, data: userFrag })
    return <Song song={nowPlaying} />
  }
}

export default NowPlaying
