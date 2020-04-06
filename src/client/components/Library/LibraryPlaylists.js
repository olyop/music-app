import React, { useContext } from "react"

import Empty from "../Empty"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import Playlist from "../Playlist"
import Playlists from "../Playlists"
import UserContext from "../../contexts/User"

import { map, orderBy } from "lodash/fp"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { filterInLibrary, pipe } from "../../helpers"

import GET_USER_PLAYLISTS from "../../graphql/queries/getUserPlaylists.graphql"

const LibraryPlaylists = () => {
  const userId = useContext(UserContext)

  const { loading, error, data } = useQuery(
    GET_USER_PLAYLISTS,
    { variables: { userId } },
  )

  if (loading) {
    return <Spinner/>
  }

  if (!isUndefined(error)) {
    return <ApiError error={error} />
  }

  const playlists = filterInLibrary(data.user.playlists)

  if (isEmpty(playlists)) {
    return (
      <Empty
        title="No Playlists"
        text="You have not created any playlists yet."
      />
    )
  }

  return (
    <Playlists>
      {pipe(playlists)(
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
