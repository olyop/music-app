import React from "react"

import Grid from "../Grid"
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
        <Grid>
          {genres.map(
            genre => (
              <Genre
                genre={genre}
                key={genre[determineDocIdKey(genre)]}
              />
            ),
          )}
        </Grid>
      )
    }
  />
)

export default BrowseGenres
