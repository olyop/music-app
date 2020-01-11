import React, { useContext } from "react"

import Genre from "../Genre"
import Empty from "../Empty"
import Genres from "../Genres"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import UserCtx from "../../ctx/user"

import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_USER_GENRES from "../../graphql/queries/getUserGenres.graphql"

const LibraryGenres = () => {
  const { user } = useContext(UserCtx)
  const { id } = user
  const queryOptions = { variables: { id } }
  const { loading, error, data } = useQuery(GET_USER_GENRES, queryOptions)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.user.genres)) {
    return <Empty/>
  } else {
    const { genres } = data.user
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

export default LibraryGenres
