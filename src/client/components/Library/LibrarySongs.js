import React from "react"

import { Query } from "react-apollo"
import ApiError from "../ApiError"
import Loading from "../Loading"
import Empty from "../Empty"
import Songs from "../Songs"
import Song from "../Song"

import { LibrarySongs as bem } from "../../globals/bem"
import { isUndefined, isEmpty, orderBy } from "lodash"
import query from "./queries/songs.graphql"

const LibrarySongs = () => (
  <div className={bem("")}>
    <Query query={query}>
      {({ loading, error, data }) => {  
        if (loading) return <Loading/>  
        if (!isUndefined(error)) return <ApiError/>
        if (isEmpty(data.songs)) return <Empty/>
        const songsOrdered = orderBy(data.songs, "title", "asc")
        return (
          <Songs>
            {songsOrdered.map(song => (
              <Song
                id={song.id}
                key={song.id}
                title={song.title}
                artistName={song.artist.name}
                albumId={song.album.id}
                albumTitle={song.album.title}
              />
            ))}
          </Songs>
        )
      }}
    </Query>
  </div>
)

export default LibrarySongs
