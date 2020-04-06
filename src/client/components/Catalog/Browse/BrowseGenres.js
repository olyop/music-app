import React from "react"

import Genre from "../../Genre"
import Genres from "../../Genres"
import QueryApi from "../../QueryApi"

import { pipe } from "../../../helpers"
import { orderBy, map } from "lodash/fp"

import GET_GENRES from "../../../graphql/queries/getGenres.graphql"

const BrowseGenres = () => (
  <QueryApi
    query={GET_GENRES}
    resultPath="genres"
    children={
      artists => (
        <Genres>
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
        </Genres>
      )
    }
  />
)

export default BrowseGenres
