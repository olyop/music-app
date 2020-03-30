import React, { useContext, Fragment } from "react"

import Empty from "../Empty"
import Album from "../Album"
import Albums from "../Albums"
import { Link } from "react-router-dom"
import UserCtx from "../../contexts/User"

import { isEmpty } from "lodash"
import { pipe } from "../../helpers"
import { filter, map, orderBy } from "lodash/fp"

const LibraryAlbums = () => {
  const { albums } = useContext(UserCtx)
  if (isEmpty(albums)) {
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
        {pipe(albums)(
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
