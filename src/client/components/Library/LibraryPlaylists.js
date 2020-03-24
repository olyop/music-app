import React, { useContext } from "react"

import Empty from "../Empty"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import Playlist from "../Playlist"
import Playlists from "../Playlists"
import UserCtx from "../../ctx/User"

import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_USER_PLAYLISTS from "../../graphql/queries/getUserPlaylists.graphql"

const LibraryPlaylists = () => {
  const user = useContext(UserCtx)
  const variables = { id: user.id }
  const { loading, error, data } = useQuery(GET_USER_PLAYLISTS, { variables })
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.user.playlists)) {
    return <Empty/>
  } else {
    return (
      <Playlists>
        {data.user.playlists.map(
          playlist => (
            <Playlist
              key={playlist.id}
              playlist={playlist}
            />
          ),
        )}
      </Playlists>
    )
  }
}

export default LibraryPlaylists
