import React from "react"

import { Query } from "react-apollo"
import ApiError from "../../ApiError"
import Loading from "../../Loading"
import Empty from "../../Empty"
import Songs from "../../Songs"
import Song from "../../Song"

import { isUndefined, isEmpty, orderBy } from "lodash"
import { catalogLink } from "../../../helpers/misc"
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
        const songsOrdered = orderBy(data.songs, ["album.released","discNumber","trackNumber"], ["desc","asc","asc"])
        return (
          <Songs>
            {songsOrdered.map(
              ({ id, title, mix, duration, album, genres, artists, remixers, featuring }) => (
                <Song
                  id={id}
                  key={id}
                  mix={mix}
                  title={title}
                  genres={genres}
                  artists={artists}
                  duration={duration}
                  remixers={remixers}
                  featuring={featuring}
                  released={album.released}
                  albumCoverUrl={catalogLink(album.id)}
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
