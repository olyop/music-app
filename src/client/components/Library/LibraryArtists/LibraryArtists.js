import React from "react"

import Empty from "../../Empty"
import Artist from "../../Artist"
import Artists from "../../Artists"
import Loading from "../../Loading"
import ApiError from "../../ApiError"
import { useQuery } from "@apollo/react-hooks"

import query from "./query.graphql"
import { isUndefined, isEmpty, orderBy } from "lodash"

const LibraryArtists = () => {
  const { loading, error, data } = useQuery(query)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.artists)) {
    return <Empty/>
  } else {
    const artists = orderBy(data.artists, "name", "asc")
    return (
      <Artists>
        {artists.map(
          artist => (
            <Artist
              key={artist.id}
              artist={artist}
            />
          )
        )}
      </Artists>
    )
  }
}

export default LibraryArtists
