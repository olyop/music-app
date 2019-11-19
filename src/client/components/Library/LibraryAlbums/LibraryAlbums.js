import React from "react"

import ApiError from "../../ApiError"
import { Query } from "react-apollo"
import Loading from "../../Loading"
import Albums from "../../Albums"
import Album from "../../Album"
import Empty from "../../Empty"

import { isUndefined, isEmpty, orderBy } from "lodash"
import query from "./query.graphql"

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
