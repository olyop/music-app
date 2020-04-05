import React, { useContext, Fragment } from "react"

import Empty from "../Empty"
import Genre from "../Genre"
import Genres from "../Genres"
import ApiError from "../ApiError"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/User"

import { pipe } from "../../helpers"
import { map, orderBy } from "lodash/fp"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_USER_GENRES from "../../graphql/queries/getUserGenres.graphql"

const LibraryGenres = () => {
  const userId = useContext(UserContext)

  const { error, data } = useQuery(
    GET_USER_GENRES,
    { variables: { id: userId } },
  )

  if (!isUndefined(error)) {
    return (
      <ApiError error={error} />
    )
  }

  if (isEmpty(data.user.genres)) {
    return (
      <Empty
        title="Your library is empty"
        text={(
          <Fragment>
            <Fragment>You can browse the </Fragment>
            <Link to="/catalog/browse/genres">catalog</Link>
            <Fragment> to add genres.</Fragment>
          </Fragment>
        )}
      />
    )
  }

  return (
    <Genres>
      {pipe(data.user.genres)(
        orderBy("dateCreated", "desc"),
        map(
          genre => (
            <Genre
              genre={genre}
              key={genre.id}
            />
          ),
        ),
      )}
    </Genres>
  )
}

export default LibraryGenres
