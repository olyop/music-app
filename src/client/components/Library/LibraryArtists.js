import React, { useContext, Fragment } from "react"

import Empty from "../Empty"
import Artist from "../Artist"
import Artists from "../Artists"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/User"

import { orderBy, map } from "lodash/fp"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { filterInLibrary, pipe } from "../../helpers"

import GET_USER_ARTISTS from "../../graphql/queries/getUserArtists.graphql"

const LibraryArtists = () => {
  const userId = useContext(UserContext)

  const { loading, error, data } = useQuery(
    GET_USER_ARTISTS,
    { variables: { userId } },
  )

  if (loading) {
    return <Spinner/>
  }

  if (!isUndefined(error)) {
    return <ApiError error={error} />
  }

  const artists = filterInLibrary(data.user.artists)

  if (isEmpty(artists)) {
    return (
      <Empty
        title="Your library is empty"
        text={(
          <Fragment>
            <Fragment>You can browse the</Fragment>
            <Link to="/catalog/browse/artists">catalog</Link>
            <Fragment> to add artists.</Fragment>
          </Fragment>
        )}
      />
    )
  }

  return (
    <Artists>
      {pipe(artists)(
        orderBy("dateAdded", "desc"),
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

export default LibraryArtists
