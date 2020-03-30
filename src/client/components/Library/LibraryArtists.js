import React, { useContext, Fragment } from "react"

import Empty from "../Empty"
import Artist from "../Artist"
import Artists from "../Artists"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/User"

import { isEmpty } from "lodash"
import { pipe } from "../../helpers"
import { filter, map, orderBy } from "lodash/fp"

const LibraryArtists = () => {
  const { artists } = useContext(UserContext)
  if (isEmpty(artists)) {
    return (
      <Empty
        title="Your library is empty"
        text={(
          <Fragment>
            <Fragment>You can </Fragment>
            <Link to="/catalog/browse/artists">browse</Link>
            <Fragment> the catalog to add artists.</Fragment>
          </Fragment>
        )}
      />
    )
  } else {
    return (
      <Artists>
        {pipe(artists)(
          filter(({ inLibrary }) => inLibrary),
          map(({ artist, dateCreated }) => ({ ...artist, dateCreated })),
          orderBy("dateCreated","desc"),
          map(
            artist => (
              <Artist
                key={artist.id}
                artist={artist}
              />
            ),
          ),
        )}
      </Artists>
    )
  }
}

export default LibraryArtists
