import React from "react"

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
        <div className="Grid">
          {artists.map(
            artist => (
              <Artist
                artist={artist}
                key={artist[determineDocIdKey(artist)]}
              />
            ),
          )}
        </div>
      )
    }
  />
)

export default BrowseArtists
