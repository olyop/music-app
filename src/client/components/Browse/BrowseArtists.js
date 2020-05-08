import React from "react"

import Artists from "../Artists"
import QueryApi from "../QueryApi"

import GET_ARTISTS from "../../graphql/queries/getArtists.gql"

const BrowseArtists = () => (
  <QueryApi
    query={GET_ARTISTS}
    resultPath="artists"
    children={artists => <Artists artists={artists} />}
  />
)

export default BrowseArtists
