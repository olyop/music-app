import React from "react"

import Grid from "../Grid"
import Artist from "../Artist"
import QueryApi from "../QueryApi"

import { determineDocIdKey } from "../../helpers"

import GET_ARTISTS from "../../graphql/queries/getArtists.gql"

const BrowseArtists = () => (
  <QueryApi
    query={GET_ARTISTS}
    resultPath="artists"
    children={
      artists => (
        <Grid>
          {artists.map(
            artist => (
              <Artist
                artist={artist}
                key={artist[determineDocIdKey(artist)]}
              />
            ),
          )}
        </Grid>
      )
    }
  />
)

export default BrowseArtists
