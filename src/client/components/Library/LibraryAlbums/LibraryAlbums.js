import React, { useContext } from "react"

import Empty from "../../Empty"
import Album from "../../Album"
import Albums from "../../Albums"
import ApiError from "../../ApiError"
import UserCtx from "../../../ctx/user"
import { useQuery } from "@apollo/react-hooks"

import { isUndefined, isEmpty } from "lodash"
import GET_USER_ALBUMS from "./getUserAlbums.graphql"

const LibraryAlbums = () => {
  const { user } = useContext(UserCtx)
  const { id } = user
  const queryOptions = { variables: { id } }
  const { loading, error, data } = useQuery(GET_USER_ALBUMS, queryOptions)
  if (loading) {
    return "Loading..."
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.user.albums)) {
    return <Empty/>
  } else {
    const { albums } = data.user
    return (
      <Albums>
        {albums.map(
          album => (
            <Album
              album={album}
              key={album.id}
            />
          )
        )}
      </Albums>
    )
  }
}

export default LibraryAlbums
