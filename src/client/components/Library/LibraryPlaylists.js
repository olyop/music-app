import React, { useContext } from "react"

import Empty from "../Empty"
import Playlist from "../Playlist"
import Playlists from "../Playlists"
import UserContext from "../../contexts/User"

import { isEmpty } from "lodash"

const LibraryPlaylists = () => {
  const { playlists } = useContext(UserContext)
  if (isEmpty(playlists)) {
    return (
      <Empty
        title="No Playlists"
        text="You have not created any playlists yet."
      />
    )
  } else {
    return (
      <Playlists>
        {playlists.map(
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
