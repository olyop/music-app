import React from "react"

import Empty from "../../Empty"
import Album from "../../Album"
import Albums from "../../Albums"
import Loading from "../../Loading"
import ApiError from "../../ApiError"
import { useQuery } from "@apollo/react-hooks"

import query from "./query.graphql"
import { isUndefined, isEmpty } from "lodash"

const LibraryAlbums = () => {
  const { loading, error, data } = useQuery(query)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.albums)) {
    return <Empty/>
  } else {
    return (
      <Albums>
        {data.albums.map(
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
