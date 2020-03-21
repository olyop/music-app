import React from "react"

import Empty from "../Empty"
import Spinner from "../Spinner"
import ApiError from "../ApiError"
import SongsTable from "../SongsTable"

import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

import GET_SONGS from "../../graphql/queries/getSongs.graphql"

const BrowseSongs = () => {
  const { loading, error, data } = useQuery(GET_SONGS)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.songs)) {
    return <Empty/>
  } else {
    return (
      <SongsTable
        songs={data.songs}
        orderByInit={{ field: "title", order: true }}
        columnsToIgnore={["cover","trackNumber","plays","released"]}
      />
    )
  }
}

export default BrowseSongs
