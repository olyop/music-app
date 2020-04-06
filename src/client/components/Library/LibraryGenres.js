import React from "react"

import Genre from "../Genre"
import Genres from "../Genres"
import QueryApi from "../QueryApi"

import { pipe } from "../../helpers"
import { orderBy, map } from "lodash/fp"

import GET_USER_GENRES from "../../graphql/queries/getUserGenres.graphql"

const LibraryGenres = () => (
  <QueryApi
    library
    query={GET_USER_GENRES}
    resultPath="user.genres"
    children={
      genres => (
        <Genres>
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
        </Genres>
      )
    }
  />
)

export default LibraryGenres
