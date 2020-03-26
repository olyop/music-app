import React from "react"

import Empty from "../Empty"
import Album from "../Album"
import Albums from "../Albums"
import Spinner from "../Spinner"
import ApiError from "../ApiError"

import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_ALBUMS from "../../graphql/queries/getAlbums.graphql"

const BrowseAlbums = () => {
  const { loading, error, data } = useQuery(GET_ALBUMS)
  if (loading) {
    return <Spinner/>
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
          ),
        )}
      </Albums>
    )
  }
}

export default BrowseAlbums
