import React from "react"

import Grid from "../Grid"
import Album from "../Album"
import QueryApi from "../QueryApi"

import GET_USER_ALBUMS from "../../graphql/queries/getUserAlbums.graphql"

const LibraryAlbums = () => (
  <QueryApi
    library
    checkEmpty
    query={GET_USER_ALBUMS}
    resultPath="user.albums"
    children={
      albums => (
        <Grid>
          {albums.map(
            album => (
              <Album
                album={album}
                key={album.id}
              />
            ),
          )}
        </Grid>
      )
    }
  />
)

export default LibraryAlbums
