import React, { Fragment } from "react"

import Empty from "../../Empty"
import Artist from "../../Artist"
import Artists from "../../Artists"
import Spinner from "../../Spinner"
import ApiError from "../../ApiError"
import { Link } from "react-router-dom"

import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_ARTISTS from "../../../graphql/queries/getArtists.graphql"

const BrowseArtists = () => {
  const { loading, error, data } = useQuery(GET_ARTISTS)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.artists)) {
    return (
      <Empty
        title="The catalog is empty."
        text={(
          <Fragment>
            <Fragment>You can </Fragment>
            <Link to="/catalog/add/artist">add</Link>
            <Fragment> artists to the catalog.</Fragment>
          </Fragment>
        )}
      />
    )
  } else {
    return (
      <Artists>
        {data.artists.map(
          artist => (
            <Artist
              key={artist.id}
              artist={artist}
            />
          ),
        )}
      </Artists>
    )
  }
}

export default BrowseArtists
