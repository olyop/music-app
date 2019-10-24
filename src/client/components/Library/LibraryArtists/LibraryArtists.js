import React from "react"

import { Query } from "react-apollo"
import ApiError from "../../ApiError"
import Loading from "../../Loading"
import Artists from "../../Artists"
import Artist from "../../Artist"
import Empty from "../../Empty"

import { isUndefined, isEmpty, orderBy } from "lodash"
import reactBEM from "@oly_op/react-bem"
import query from "./query.graphql"

const bem = reactBEM("LibraryArtists")

const LibraryArtists = () => (
  <div className={bem("")}>
    <Query query={query}>
      {({ loading, error, data }) => {
        if (loading) return <Loading/>  
        if (!isUndefined(error)) return <ApiError/>
        if (isEmpty(data.artists)) return <Empty/>
        const artistsOrdered = orderBy(data.artists, "name", "asc")
        return (
          <Artists>
            {artistsOrdered.map(artist => (
              <Artist
                id={artist.id}
                key={artist.id}
                name={artist.name}
              />
            ))}
          </Artists>
        )
      }}
    </Query>
  </div>
)

export default LibraryArtists
