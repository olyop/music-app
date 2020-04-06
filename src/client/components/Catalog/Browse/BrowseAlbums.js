import React, { Fragment, useContext } from "react"

import Empty from "../../Empty"
import Album from "../../Album"
import Albums from "../../Albums"
import Spinner from "../../Spinner"
import ApiError from "../../ApiError"
import { Link } from "react-router-dom"
import UserContext from "../../../contexts/User"

import { pipe } from "../../../helpers"
import { orderBy, map } from "lodash/fp"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_ALBUMS from "../../../graphql/queries/getAlbums.graphql"

const BrowseAlbums = () => {
  const userId = useContext(UserContext)

  const { loading, error, data } = useQuery(
    GET_ALBUMS,
    { variables: { userId } },
  )

  if (loading) {
    return <Spinner/>
  }

  if (!isUndefined(error)) {
    return <ApiError error={error} />
  }

  if (isEmpty(data.albums)) {
    return (
      <Empty
        title="The catalog is empty."
        text={(
          <Fragment>
            <Fragment>You can </Fragment>
            <Link to="/catalog/add/album">add</Link>
            <Fragment> albums to the catalog.</Fragment>
          </Fragment>
        )}
      />
    )
  }

  return (
    <Albums>
      {pipe(data.albums)(
        orderBy("released", "desc"),
        map(
          album => (
            <Album
              album={album}
              key={album.id}
            />
          ),
        ),
      )}
    </Albums>
  )
}

export default BrowseAlbums
