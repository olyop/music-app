import React, { useContext, Fragment } from "react"

import Empty from "../Empty"
import Album from "../Album"
import Albums from "../Albums"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import { Link } from "react-router-dom"
import UserCtx from "../../contexts/User"

import { pipe } from "../../helpers"
import { filter, map } from "lodash/fp"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_USER_ALBUMS from "../../graphql/queries/getUserAlbums.graphql"

const LibraryAlbums = () => {
  const { id } = useContext(UserCtx)
  const variables = { id }
  const { loading, error, data } = useQuery(GET_USER_ALBUMS, { variables })
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.user.albums)) {
    return (
      <Empty
        title="Your library is empty"
        text={(
          <Fragment>
            <Fragment>You can </Fragment>
            <Link to="/catalog/browse/albums">browse</Link>
            <Fragment> the catalog to add albums.</Fragment>
          </Fragment>
        )}
      />
    )
  } else {
    return (
      <Albums>
        {pipe(data.user.albums)(
          filter(({ inLibrary }) => inLibrary),
          map(
            ({ album }) => (
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
}

export default LibraryAlbums
