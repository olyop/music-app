import React, { useContext } from "react"

import Empty from "../Empty"
import Album from "../Album"
import Albums from "../Albums"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import UserCtx from "../../ctx/User"

import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_USER_ALBUMS from "../../graphql/queries/getUserAlbums.graphql"

const LibraryAlbums = () => {
  const user = useContext(UserCtx)
  const variables = { id: user.id }
  const { loading, error, data } = useQuery(GET_USER_ALBUMS, { variables })
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.user.albums)) {
    return <Empty/>
  } else {
    return (
      <Albums>
        {data.user.albums.map(
          ({ album }) => (
            <Album
              album={album}
              key={album.id}
            />
          ),
        )}
      </Albums>
    )
  }
}

export default LibraryAlbums
