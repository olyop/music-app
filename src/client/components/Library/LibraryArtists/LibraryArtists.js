import React from "react"

import { Query } from "react-apollo"
import ApiError from "../../ApiError"
import Loading from "../../Loading"
import Artists from "../../Artists"
import Artist from "../../Artist"
import Empty from "../../Empty"

import { isUndefined, isEmpty, orderBy } from "lodash"
import { catalogLink } from "../../../helpers/misc"
import query from "./query.graphql"

const LibraryArtists = () => (
  <Query query={query}>
    {({ loading, error, data }) => {
      if (loading) {
        return <Loading/>
      } else if (!isUndefined(error)) {
        return <ApiError/>
      } else if (isEmpty(data.artists)) {
        return <Empty/>
      } else {
        const artists = orderBy(data.artists, "name", "asc")
        return (
          <Artists>
            {artists.map(
              ({ id, name }) => (
                <Artist
                  id={id}
                  key={id}
                  name={name}
                  artistPhotoUrl={catalogLink(id)}
                />
              )
            )}
          </Artists>
        )
      }
    }}
  </Query>
)

export default LibraryArtists
