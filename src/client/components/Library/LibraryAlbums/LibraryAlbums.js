import React from "react"

import { Query } from "react-apollo"
import ApiError from "../../ApiError"
import Loading from "../../Loading"
import Albums from "../../Albums"
import Album from "../../Album"
import Empty from "../../Empty"

import { isUndefined, isEmpty, orderBy } from "lodash"
import reactBEM from "@oly_op/react-bem"
import query from "./query.graphql"

const bem = reactBEM("LibraryAlbums")

const LibraryAlbums = () => (
  <div className={bem("")}>
    <Query query={query}>
      {({ loading, error, data }) => {
        if (loading) return <Loading/>  
        if (!isUndefined(error)) return <ApiError/>
        if (isEmpty(data.albums)) return <Empty/>
        const albumsOrdered = orderBy(data.albums, "year", "desc")
        return (
          <Albums>
            {albumsOrdered.map(album => (
              <Album
                id={album.id}
                key={album.id}
                title={album.title}
                artists={album.artists}
                remixers={album.remixers}
                albumUrl={`/images/catalog/albumCovers/${album.id}.jpg`}
              />
            ))}
          </Albums>
        )
      }}
    </Query>
  </div>
)

export default LibraryAlbums
