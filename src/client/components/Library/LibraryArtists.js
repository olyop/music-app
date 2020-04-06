import React from "react"

import Artist from "../Artist"
import Artists from "../Artists"
import QueryApi from "../QueryApi"

import { pipe } from "../../helpers"
import { orderBy, map } from "lodash/fp"

import GET_USER_ARTISTS from "../../graphql/queries/getUserArtists.graphql"

const LibraryArtists = () => (
  <QueryApi
    library
    query={GET_USER_ARTISTS}
    resultPath="user.artists"
    children={
      artists => (
        <Artists>
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
        </Artists>
      )
    }
  />
)

export default LibraryArtists
