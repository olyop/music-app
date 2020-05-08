import React from "react"

import Genres from "../Genres"
import QueryApi from "../QueryApi"

import GET_GENRES from "../../graphql/queries/getGenres.gql"

const BrowseGenres = () => (
  <QueryApi
    query={GET_GENRES}
    resultPath="genres"
    children={genres => <Genres genres={genres} />}
  />
)

export default BrowseGenres
