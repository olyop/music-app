import React, { useContext } from "react"

import Song from "../../Song"
import Spinner from "../../Spinner"
import ApiError from "../../ApiError"
import UserCtx from "../../../ctx/user"

import { isUndefined } from "lodash"
import GET_USER from "./getUser.graphql"
import { useQuery } from "@apollo/react-hooks"
import GET_USER_FRAG from "./getUserFrag.graphql"

const PlayerNowPlaying = () => {
  const { user } = useContext(UserCtx)
  const { id } = user
  const queryOptions = { variables: { id } }
  const { loading, error, data, client } = useQuery(GET_USER, queryOptions)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else {
    const { nowPlaying } = data.user
    client.writeFragment({
      id,
      fragment: GET_USER_FRAG,
      data: { nowPlaying, __typename: "User" },
    })
    return <Song song={nowPlaying} />
  }
}

export default PlayerNowPlaying
