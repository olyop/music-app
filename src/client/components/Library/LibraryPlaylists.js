import React, { useContext } from "react"

import Empty from "../Empty"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import Playlist from "../Playlist"
import Playlists from "../Playlists"
import UserContext from "../../contexts/User"

import { pipe } from "../../helpers"
import { map, orderBy } from "lodash/fp"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_USER_PLAYLISTS from "../../graphql/queries/getUserPlaylists.graphql"

const LibraryPlaylists = () => {
  const userId = useContext(UserContext)

  const { loading, error, data } = useQuery(
    GET_USER_PLAYLISTS,
    { variables: { id: userId } },
  )

  if (loading) {
    return <Spinner/>
  }

  if (!isUndefined(error)) {
    return <ApiError error={error} />
  }

  if (isEmpty(data.user.playlists)) {
    return (
      <Empty
        title="No Playlists"
        text="You have not created any playlists yet."
      />
    )
  }

  return (
    <Playlists>
      {pipe(data.user.playlists)(
        orderBy("dateAdded", "desc"),
        map(
          playlist => (
            <Playlist
              key={playlist.id}
              playlist={playlist}
            />
          ),
        ),
      )}
    </Playlists>
  )
}

export default LibraryPlaylists
