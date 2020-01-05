import React from "react"

import Genre from "../../Genre"
import Empty from "../../Empty"
import Genres from "../../Genres"
import Spinner from "../../Spinner"
import ApiError from "../../ApiError"
import { useQuery } from "@apollo/react-hooks"

import GET_GENRES from "./getGenres.graphql"
import { isUndefined, isEmpty } from "lodash"

const BrowseGenres = () => {
  const { loading, error, data } = useQuery(GET_GENRES)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.genres)) {
    return <Empty/>
  } else {
    const { genres } = data
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
}

export default BrowseGenres
