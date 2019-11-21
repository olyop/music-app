import React from "react"

import Song from "../../Song"
import Empty from "../../Empty"
import Songs from "../../Songs"
import Loading from "../../Loading"
import { Query } from "react-apollo"
import ApiError from "../../ApiError"

import query from "./query.graphql"
import { isUndefined, isEmpty, orderBy } from "lodash"

const LibrarySongs = () => (
  <Query query={query}>
    {({ loading, error, data }) => {  
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
    }}
  </Query>
)

export default LibrarySongs
