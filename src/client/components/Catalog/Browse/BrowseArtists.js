import React from "react"

import Artist from "../../Artist"
import Artists from "../../Artists"
import QueryApi from "../../QueryApi"

import { pipe } from "../../../helpers"
import { orderBy, map } from "lodash/fp"

import GET_ARTISTS from "../../../graphql/queries/getArtists.graphql"

const BrowseArtists = () => (
  <QueryApi
    query={GET_ARTISTS}
    resultPath="artists"
    children={
      artists => (
        <Artists>
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
        </Artists>
      )
    }
  />
)

export default BrowseArtists
