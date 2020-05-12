import React from "react"

import List from "../List"
import Genre from "../Genre"
import QueryApi from "../QueryApi"

import GET_GENRES from "../../graphql/queries/getGenres.gql"

const BrowseGenres = () => (
  <QueryApi
    query={GET_GENRES}
    children={
      ({ genres }) => (
        <List>
          {genres.map(
            genre => (
              <Genre
                genre={genre}
                key={genre.genreId}
              />
            ),
          )}
        </List>
      )
    }
  />
)

export default BrowseGenres
