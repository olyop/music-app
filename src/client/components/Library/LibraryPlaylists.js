import React, { useContext } from "react"

import Empty from "../Empty"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import Playlist from "../Playlist"
import Playlists from "../Playlists"
import UserContext from "../../contexts/User"

import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_USER_PLAYLISTS from "../../graphql/queries/getUserPlaylists.graphql"

const LibraryPlaylists = () => {
  const { id } = useContext(UserContext)
  const variables = { id }
  const { data, loading, error } = useQuery(GET_USER_PLAYLISTS, { variables })
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError error={error} />
  } else if (isEmpty(data.user.playlists)) {
    return (
      <Empty
        title="No Playlists"
        text="You have not created any playlists yet."
      />
    )
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
