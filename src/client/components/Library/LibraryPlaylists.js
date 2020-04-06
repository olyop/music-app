import React from "react"

import Playlist from "../Playlist"
import Playlists from "../Playlists"
import QueryApi from "../QueryApi"

import { pipe } from "../../helpers"
import { orderBy, map } from "lodash/fp"

import GET_USER_PLAYLISTS from "../../graphql/queries/getUserPlaylists.graphql"

const LibraryPlaylists = () => (
  <QueryApi
    library
    query={GET_USER_PLAYLISTS}
    resultPath="user.playlists"
    children={
      playlists => (
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
  />
)

export default LibraryPlaylists
