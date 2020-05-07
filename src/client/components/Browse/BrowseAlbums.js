import React from "react"

import Albums from "../Albums"
import QueryApi from "../QueryApi"

import GET_ALBUMS from "../../graphql/queries/getAlbums.gql"

const BrowseAlbums = () => (
  <QueryApi
    query={GET_ALBUMS}
    resultPath="albums"
    children={albums => <Albums albums={albums} />}
  />
)

export default BrowseAlbums
