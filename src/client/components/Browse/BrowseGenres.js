import React from "react"

import Grid from "../Grid"
import Genre from "../Genre"
import QueryApi from "../QueryApi"

import { pipe } from "../../helpers"
import { orderBy, map } from "lodash/fp"

import GET_GENRES from "../../graphql/queries/getGenres.gql"

const BrowseGenres = () => (
  <QueryApi
    query={GET_GENRES}
    resultPath="genres"
    children={
      artists => (
        <Grid>
          {pipe(artists)(
            orderBy("released", "desc"),
            map(
              genre => (
                <Genre
                  key={genre.id}
                  genre={genre}
                />
              ),
            ),
          )}
        </Grid>
      )
    }
  />
)

export default BrowseGenres
