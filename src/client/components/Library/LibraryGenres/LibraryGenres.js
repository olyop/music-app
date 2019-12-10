import React from "react"

import Genre from "../../Genre"
import Empty from "../../Empty"
import Genres from "../../Genres"
import Loading from "../../Loading"
import ApiError from "../../ApiError"
import { useQuery } from "@apollo/react-hooks"

import query from "./query.graphql"
import { isUndefined, isEmpty } from "lodash"

const LibraryGenres = () => {
  const { loading, error, data } = useQuery(query)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.genres)) {
    return <Empty/>
  } else {
    return (
      <Genres>
        {data.genres.map(
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
}

export default LibraryGenres
