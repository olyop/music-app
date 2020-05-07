import React from "react"

import Grid from "../Grid"
import Album from "../Album"
import QueryApi from "../QueryApi"

import { determineDocIdKey } from "../../helpers"

import GET_ALBUMS from "../../graphql/queries/getAlbums.gql"

const BrowseAlbums = () => (
  <QueryApi
    query={GET_ALBUMS}
    resultPath="albums"
    children={
      albums => (
        <Grid>
          {albums.map(
            album => (
              <Album
                album={album}
                key={album[determineDocIdKey(album)]}
              />
            ),
          )}
        </Grid>
      )
    }
  />
)

export default BrowseAlbums
