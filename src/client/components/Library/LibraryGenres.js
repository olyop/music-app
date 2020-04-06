import React, { useContext, Fragment } from "react"

import Empty from "../Empty"
import Genre from "../Genre"
import Genres from "../Genres"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/User"

import { map, orderBy } from "lodash/fp"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { filterInLibrary, pipe } from "../../helpers"

import GET_USER_GENRES from "../../graphql/queries/getUserGenres.graphql"

const LibraryGenres = () => {
  const userId = useContext(UserContext)

  const { loading, error, data } = useQuery(
    GET_USER_GENRES,
    { variables: { userId } },
  )

  if (loading) {
    return <Spinner/>
  }

  if (!isUndefined(error)) {
    return <ApiError error={error} />
  }

  const genres = filterInLibrary(data.user.genres)

  if (isEmpty(genres)) {
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
      {pipe(genres)(
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
