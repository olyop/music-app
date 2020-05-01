import React from "react"

import Grid from "../Grid"
import Playlist from "../Playlist"
import QueryApi from "../QueryApi"

import { pipe } from "../../helpers"
import { orderBy, map } from "lodash/fp"

import GET_USER_PLAYLISTS from "../../graphql/queries/getUserPlaylists.gql"

const LibraryPlaylists = () => (
  <QueryApi
    library
    checkEmpty
    query={GET_USER_PLAYLISTS}
    resultPath="user.playlists"
    children={
      playlists => (
        <Grid>
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
        </Grid>
      )
    }
  />
)

export default LibraryPlaylists
