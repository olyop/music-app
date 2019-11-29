import React from "react"

import Song from "../../Song"
import Empty from "../../Empty"
import Songs from "../../Songs"
import Loading from "../../Loading"
import ApiError from "../../ApiError"
import { useQuery } from "@apollo/react-hooks"

import query from "./query.graphql"
import { isUndefined, isEmpty, orderBy } from "lodash"

const LibrarySongs = () => {
  const { loading, error, data } = useQuery(query)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.songs)) {
    return <Empty/>
  } else {
    const songs = orderBy(
      data.songs,
      ["album.released","discNumber","trackNumber"],
      ["desc","asc","asc"]
    )
    return (
      <Songs>
        {songs.map(
          song => (
            <Song
              song={song}
              key={song.id}
            />
          )
        )}
      </Songs>
    )
  }
}

export default LibrarySongs
