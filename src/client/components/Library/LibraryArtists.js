import React from "react"

import Grid from "../Grid"
import Artist from "../Artist"
import QueryApi from "../QueryApi"

import { pipe } from "../../helpers"
import { orderBy, map } from "lodash/fp"

import GET_USER_ARTISTS from "../../graphql/queries/getUserArtists.graphql"

const LibraryArtists = () => (
  <QueryApi
    library
    checkEmpty
    query={GET_USER_ARTISTS}
    resultPath="user.artists"
    children={
      artists => (
        <Grid>
          {pipe(artists)(
            orderBy("dateAdded", "desc"),
            map(
              artist => (
                <Artist
                  key={artist.id}
                  artist={artist}
                />
              ),
            ),
          )}
        </Grid>
      )
    }
  />
)

export default LibraryArtists
