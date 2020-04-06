import React from "react"

import Album from "../../Album"
import Albums from "../../Albums"
import QueryApi from "../../QueryApi"

import { pipe } from "../../../helpers"
import { orderBy, map } from "lodash/fp"

import GET_ALBUMS from "../../../graphql/queries/getAlbums.graphql"

const BrowseAlbums = () => (
  <QueryApi
    query={GET_ALBUMS}
    resultPath="albums"
    filterInLibrary={false}
    children={
      albums => (
        <Albums>
          {pipe(albums)(
            orderBy("released", "desc"),
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

export default BrowseAlbums
