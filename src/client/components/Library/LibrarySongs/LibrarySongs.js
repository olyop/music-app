import React from "react"

import { Query } from "react-apollo"
import ApiError from "../../ApiError"
import Loading from "../../Loading"
import Empty from "../../Empty"
import Songs from "../../Songs"
import Song from "../../Song"

import { isUndefined, isEmpty, orderBy } from "lodash"
import reactBEM from "@oly_op/react-bem"
import query from "./query.graphql"

const bem = reactBEM("LibrarySongs")

const LibrarySongs = () => (
  <div className={bem("")}>
    <Query query={query}>
      {({ loading, error, data }) => {  
        if (loading) return <Loading/>  
        if (!isUndefined(error)) return <ApiError/>
        if (isEmpty(data.songs)) return <Empty/>
        const songsOrdered = orderBy(data.songs, "album.released", "desc")
        return (
          <Songs>
            {songsOrdered.map(song => (
              <Song
                id={song.id}
                key={song.id}
                mix={song.mix}
                title={song.title}
                album={song.album}
                genres={song.genres}
                artists={song.artists}
                remixers={song.remixers}
                featuring={song.featuring}
                released={song.album.released}
                albumUrl={`/images/catalog/albumCovers/${song.album.id}.jpg`}
              />
            ))}
          </Songs>
        )
      }}
    </Query>
  </div>
)

export default LibrarySongs
