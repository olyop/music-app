import React from "react"

import Genre from "../Genre"
import Empty from "../Empty"
import Genres from "../Genres"
import Spinner from "../Spinner"
import ApiError from "../ApiError"

import { useQuery } from "@apollo/react-hooks"
import { isUndefined, isEmpty } from "lodash"

import GET_GENRES from "../../graphql/queries/getGenres.graphql"

const BrowseGenres = () => {
  const { loading, error, data } = useQuery(GET_GENRES)
  if (loading) {
    return <Spinner/>
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
          ),
        )}
      </Genres>
    )
  }
}

export default BrowseGenres
