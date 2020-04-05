import React, { Fragment, useContext } from "react"

import Genre from "../../Genre"
import Empty from "../../Empty"
import Genres from "../../Genres"
import Spinner from "../../Spinner"
import ApiError from "../../ApiError"
import { Link } from "react-router-dom"
import UserContext from "../../../contexts/User"

import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_GENRES from "../../../graphql/queries/getGenres.graphql"

const BrowseGenres = () => {
  const userId = useContext(UserContext)

  const { loading, error, data } = useQuery(
    GET_GENRES,
    { variables: { userId } },
  )

  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.genres)) {
    return (
      <Empty
        title="The catalog is empty."
        text={(
          <Fragment>
            <Fragment>You can </Fragment>
            <Link to="/catalog/add/genre">add</Link>
            <Fragment> genres to the catalog.</Fragment>
          </Fragment>
        )}
      />
    )
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
