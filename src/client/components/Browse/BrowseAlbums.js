import React from "react"

import List from "../List"
import Album from "../Album"
import QueryApi from "../QueryApi"

import GET_ALBUMS from "../../graphql/queries/getAlbums.gql"

const BrowseAlbums = () => (
  <QueryApi
    query={GET_ALBUMS}
    children={({ albums }) => (
      <List>
        {albums.map(
          album => (
            <Album
              album={album}
              key={album.albumId}
            />
          ),
        )}
      </List>
    )}
  />
)

export default BrowseAlbums
