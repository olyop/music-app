import React from "react"

import { Query } from "react-apollo"
import ApiError from "../../ApiError"
import Loading from "../../Loading"
import Empty from "../../Empty"
import Songs from "../../Songs"
import Song from "../../Song"

import { isUndefined, isEmpty, orderBy } from "lodash"
import query from "./query.graphql"

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
        const songs = orderBy(data.songs, ["album.released","discNumber","trackNumber"], ["desc","asc","asc"])
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
