import React from "react"

import Empty from "../../../Empty"
import Spinner from "../../../Spinner"
import ApiError from "../../../ApiError"
import SongTable from "../../../SongTable"
import SongsTable from "../../../SongsTable"

import GET_SONGS from "./getSongs.graphql"
import { isUndefined, isEmpty } from "lodash"
import { useQuery } from "@apollo/react-hooks"

const BrowseSongs = () => {
  const { loading, error, data } = useQuery(GET_SONGS)
  if (loading) {
    return <Spinner/>
  } else if (!isUndefined(error)) {
    return <ApiError/>
  } else if (isEmpty(data.songs)) {
    return <Empty/>
  } else {
    const columnsToIgnore = ["cover","play","trackNumber"]
    return (
      <SongsTable columnsToIgnore={columnsToIgnore}>
        {data.songs.map(
          song => (
            <SongTable
              song={song}
              key={song.id}
              inLibrary={false}
              columnsToIgnore={columnsToIgnore}
            />
          )
        )}
      </SongsTable>
    )
  }
}

export default BrowseSongs
