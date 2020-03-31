import React, { Fragment } from "react"

import Empty from "../Empty"
import Album from "../Album"
import Albums from "../Albums"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import { Link } from "react-router-dom"

import { pipe } from "../../helpers"
import { USER_ID } from "../../globals"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { filter, map, orderBy } from "lodash/fp"

import GET_USER_ALBUMS from "../../graphql/queries/getUserAlbums.graphql"

const LibraryAlbums = () => {
  const variables = { id: USER_ID }
  const { data, loading, error } = useQuery(GET_USER_ALBUMS, { variables })
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError error={error} />
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
          map(({ album, dateCreated }) => ({ ...album, dateCreated })),
          orderBy("dateCreated","desc"),
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
}

export default LibraryAlbums
