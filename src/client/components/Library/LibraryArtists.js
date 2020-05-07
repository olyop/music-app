import React from "react"

import Artist from "../Artist"
import QueryApi from "../QueryApi"

import { pipe } from "../../helpers"
import { orderBy, map } from "lodash/fp"

import GET_USER_ARTISTS from "../../graphql/queries/getUserArtists.gql"

const LibraryArtists = () => (
  <QueryApi
    library
    checkEmpty
    query={GET_USER_ARTISTS}
    resultPath="user.artists"
    children={
      artists => (
        <div className="Grid">
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
        </div>
      )
    }
  />
)

export default LibraryArtists
