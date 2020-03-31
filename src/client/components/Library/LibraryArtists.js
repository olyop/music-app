import React, { Fragment } from "react"

import Empty from "../Empty"
import Artist from "../Artist"
import Artists from "../Artists"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import { Link } from "react-router-dom"

import { pipe } from "../../helpers"
import { USER_ID } from "../../globals"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { filter, map, orderBy } from "lodash/fp"

import GET_USER_ARTISTS from "../../graphql/queries/getUserArtists.graphql"

const LibraryArtists = () => {
  const variables = { id: USER_ID }
  const { data, loading, error } = useQuery(GET_USER_ARTISTS, { variables })
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError error={error} />
  } else if (isEmpty(data.user.artists)) {
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
        {pipe(data.user.artists)(
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
