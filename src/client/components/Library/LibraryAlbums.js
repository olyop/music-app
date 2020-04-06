import React from "react"

import Album from "../Album"
import Albums from "../Albums"
import QueryApi from "../QueryApi"

import { pipe } from "../../helpers"
import { orderBy, map } from "lodash/fp"

import GET_USER_ALBUMS from "../../graphql/queries/getUserAlbums.graphql"

const LibraryAlbums = () => (
  <QueryApi
    query={GET_USER_ALBUMS}
    collectionName="albums"
    children={
      albums => (
        <Albums>
          {pipe(albums)(
            orderBy("dateAdded", "desc"),
            map(
              album => (
                <Album
                  album={album}
                  key={album.id}
                />
              ),
            ),
          )}
        </Albums>
      )
    }
  />
)

export default LibraryAlbums
