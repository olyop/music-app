import React from "react"

import Empty from "../Empty"
import Artist from "../Artist"
import Artists from "../Artists"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import { useQuery } from "@apollo/react-hooks"

import { map, filter } from "lodash/fp"
import { pipe } from "../../helpers/misc"
import { isUndefined, isEmpty } from "lodash"

import GET_ARTISTS from "../../graphql/queries/getArtists.graphql"

const BrowseArtists = () => {
  const { loading, error, data } = useQuery(GET_ARTISTS)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.artists)) {
    return <Empty/>
  } else {
    return (
      <Artists>
        {pipe(data.artists)(
          filter(({ name }) => name !== "Various Artists"),
          map(
            artist => (
              <Artist
                key={artist.id}
                artist={artist}
              />
            ),
          ),
        )}
      </Artists>
    )
  }
}

export default BrowseArtists
