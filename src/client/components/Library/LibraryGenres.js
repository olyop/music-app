import React from "react"

import Grid from "../Grid"
import Genre from "../Genre"
import QueryApi from "../QueryApi"

import { pipe } from "../../helpers"
import { orderBy, map } from "lodash/fp"

import GET_USER_GENRES from "../../graphql/queries/getUserGenres.graphql"

const LibraryGenres = () => (
  <QueryApi
    library
    checkEmpty
    query={GET_USER_GENRES}
    resultPath="user.genres"
    children={
      genres => (
        <Grid>
          {pipe(genres)(
            orderBy("dateAdded", "desc"),
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

export default LibraryGenres
