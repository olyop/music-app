import React, { useContext, Fragment } from "react"

import Empty from "../Empty"
import Album from "../Album"
import Albums from "../Albums"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/User"

import { pipe } from "../../helpers"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { filter, orderBy, map } from "lodash/fp"

import GET_USER_ALBUMS from "../../graphql/queries/getUserAlbums.graphql"

const LibraryAlbums = () => {
  const userId = useContext(UserContext)

  const { loading, error, data } = useQuery(
    GET_USER_ALBUMS,
    { variables: { id: userId } },
  )

  if (loading) {
    return <Spinner/>
  }

  if (!isUndefined(error)) {
    return <ApiError error={error} />
  }

  if (isEmpty(data.user.albums)) {
    return (
      <Empty
        title="Your library is empty"
        text={(
          <Fragment>
            <Fragment>You can browse the </Fragment>
            <Link to="/catalog/browse/albums">catalog</Link>
            <Fragment> to add albums.</Fragment>
          </Fragment>
        )}
      />
    )
  }

  return (
    <Albums>
      {pipe(data.user.albums)(
        filter(({ inLibrary }) => !inLibrary),
        orderBy("dateAdded", "desc"),
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

export default LibraryAlbums
