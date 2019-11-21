import React from "react"

import Empty from "../../Empty"
import Album from "../../Album"
import Albums from "../../Albums"
import Loading from "../../Loading"
import { Query } from "react-apollo"
import ApiError from "../../ApiError"

import query from "./query.graphql"
import { isUndefined, isEmpty, orderBy } from "lodash"

const LibraryAlbums = () => (
  <Query query={query}>
    {({ loading, error, data }) => {
      if (loading) {
        return <Loading/>
      } else if (!isUndefined(error)) {
        return <ApiError/>
      } else if (isEmpty(data.albums)) {
        return <Empty/>
      } else {
        const albums = orderBy(data.albums, "year", "desc")
        return (
          <Albums>
            {albums.map(
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
    }}
  </Query>
)

export default LibraryAlbums
