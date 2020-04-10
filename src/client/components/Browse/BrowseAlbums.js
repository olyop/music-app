import React from "react"

import Grid from "../Grid"
import Album from "../Album"
import QueryApi from "../QueryApi"

import { pipe } from "../../helpers"
import { orderBy, map } from "lodash/fp"

import GET_ALBUMS from "../../graphql/queries/getAlbums.graphql"

const BrowseAlbums = () => (
  <QueryApi
    query={GET_ALBUMS}
    resultPath="albums"
    children={
      albums => (
        <Grid>
          {pipe(albums)(
            orderBy("released", "desc"),
            map(
              album => (
                <Album
                  album={album}
                  key={album.id}
                />
              ),
            ),
          )}
        </Grid>
      )
    }
  />
)

export default BrowseAlbums
