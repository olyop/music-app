import React, { Fragment } from "react"

import Empty from "../../Empty"
import Spinner from "../../Spinner"
import ApiError from "../../ApiError"
import SongsTable from "../../SongsTable"
import { Link } from "react-router-dom"

import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_SONGS from "../../../graphql/queries/getSongs.graphql"

const addEmptyAlbumCoverToSongs = songs => songs.map(
  song => ({
    ...song,
    album: { ...song.album, cover: "" },
  }),
)

const BrowseSongs = () => {
  const { loading, error, data } = useQuery(GET_SONGS)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.songs)) {
    return (
      <Empty
        title="The catalog is empty."
        text={(
          <Fragment>
            <Fragment>You can </Fragment>
            <Link to="/catalog/add/song">add</Link>
            <Fragment> songs to the catalog.</Fragment>
          </Fragment>
        )}
      />
    )
  } else {
    return (
      <SongsTable
        orderByInit={{ field: "title", order: true }}
        songs={addEmptyAlbumCoverToSongs(data.songs)}
        columnsToIgnore={["cover","trackNumber","numOfPlays","released","dateCreated"]}
      />
    )
  }
}

export default BrowseSongs
