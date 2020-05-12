import React from "react"

import List from "../List"
import Artist from "../Artist"
import QueryApi from "../QueryApi"

import GET_ARTISTS from "../../graphql/queries/getArtists.gql"

const BrowseArtists = () => (
  <QueryApi
    query={GET_ARTISTS}
    children={
      ({ artists }) => (
        <List>
          {artists.map(
            artist => (
              <Artist
                artist={artist}
                key={artist.artistId}
              />
            ),
          )}
        </List>
      )
    }
  />
)

export default BrowseArtists
