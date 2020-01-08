import React, { useContext } from "react"

import Empty from "../../Empty"
import Artist from "../../Artist"
import Artists from "../../Artists"
import Spinner from "../../Spinner"
import ApiError from "../../ApiError"
import UserCtx from "../../../ctx/user"
import { useQuery } from "@apollo/react-hooks"

import { isUndefined, isEmpty } from "lodash"
import GET_USER_ARTISTS from "../../../graphql/getUserArtists.graphql"

const LibraryArtists = () => {
  const { user } = useContext(UserCtx)
  const { id } = user
  const queryOptions = { variables: { id } }
  const { loading, error, data } = useQuery(GET_USER_ARTISTS, queryOptions)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.user.artists)) {
    return <Empty/>
  } else {
    const { artists } = data.user
    return (
      <Artists>
        {artists.map(
          artist => (
            <Artist
              key={artist.id}
              artist={artist}
            />
          )
        )}
      </Artists>
    )
  }
}

export default LibraryArtists
