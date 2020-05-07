import React from "react"

import Genre from "../Genre"
import QueryApi from "../QueryApi"

import { determineDocIdKey } from "../../helpers"

import GET_GENRES from "../../graphql/queries/getGenres.gql"

const BrowseGenres = () => (
  <QueryApi
    query={GET_GENRES}
    resultPath="genres"
    children={
      genres => (
        <div className="Grid">
          {genres.map(
            genre => (
              <Genre
                genre={genre}
                key={genre[determineDocIdKey(genre)]}
              />
            ),
          )}
        </div>
      )
    }
  />
)

export default BrowseGenres
