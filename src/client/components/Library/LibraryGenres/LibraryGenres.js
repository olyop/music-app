import React from "react"

import { Query } from "react-apollo"
import ApiError from "../../ApiError"
import Loading from "../../Loading"
import Genres from "../../Genres"
import Genre from "../../Genre"
import Empty from "../../Empty"

import { isUndefined, isEmpty, orderBy } from "lodash"
import reactBEM from "@oly_op/react-bem"
import query from "./query.graphql"

const bem = reactBEM("LibraryGenres")

const LibraryGenres = () => (
  <div className={bem("")}>
    <Query query={query}>
      {({ loading, error, data }) => {
        if (loading) return <Loading/>  
        if (!isUndefined(error)) return <ApiError/>
        if (isEmpty(data.genres)) return <Empty/>
        const genresOrdered = orderBy(data.genres, "name", "asc")
        return (
          <Genres>
            {genresOrdered.map(genre => (
              <Genre
                id={genre.id}
                key={genre.id}
                name={genre.name}
              />
            ))}
          </Genres>
        )
      }}
    </Query>
  </div>
)

export default LibraryGenres
