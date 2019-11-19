import React from "react"

import { Query } from "react-apollo"
import ApiError from "../../ApiError"
import Loading from "../../Loading"
import Genres from "../../Genres"
import Genre from "../../Genre"
import Empty from "../../Empty"

import { isUndefined, isEmpty, orderBy } from "lodash"
import query from "./query.graphql"

const LibraryGenres = () => (
  <Query query={query}>
    {({ loading, error, data }) => {
      if (loading) {
        return <Loading/>
      } else if (!isUndefined(error)) {
        return <ApiError/>
      } else if (isEmpty(data.genres)) {
        return <Empty/>
      } else {
        const genres = orderBy(data.genres, "name", "asc")
        return (
          <Genres>
            {genres.map(
              genre => (
                <Genre
                  genre={genre}
                  key={genre.id}
                />
              )
            )}
          </Genres>
        )
      }
    }}
  </Query>
)

export default LibraryGenres
