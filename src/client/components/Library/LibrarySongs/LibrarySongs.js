import React from "react"

import Empty from "../../Empty"
import Loading from "../../Loading"
import ApiError from "../../ApiError"
import SongTable from "../../SongTable"
import SongsTable from "../../SongsTable"

import query from "./query.graphql"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

const LibrarySongs = () => {
  const { loading, error, data } = useQuery(query)
  if (loading) {
    return <Loading/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.songs)) {
    return <Empty/>
  } else {
    return (
      <SongsTable columnsToIgnore={["trackNumber"]}>
        {data.songs.map(
          song => (
            <SongTable
              song={song}
              key={song.id}
              columnsToIgnore={["trackNumber"]}
            />
          )
        )}
      </SongsTable>
    )
  }
}

export default LibrarySongs
