import React from "react"

import Grid from "../Grid"
import Artist from "../Artist"
import QueryApi from "../QueryApi"

import { pipe } from "../../helpers"
import { orderBy, map } from "lodash/fp"

import GET_ARTISTS from "../../graphql/queries/getArtists.gql"

const BrowseArtists = () => (
  <QueryApi
    query={GET_ARTISTS}
    resultPath="artists"
    children={
      artists => (
        <Grid>
          {pipe(artists)(
            orderBy("released", "desc"),
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

export default BrowseArtists
