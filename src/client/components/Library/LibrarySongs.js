import React from "react"

import QueryApi from "../QueryApi"
import SongsTable from "../SongsTable"

import GET_USER_SONGS from "../../graphql/queries/getUserSongs.graphql"

const LibrarySongs = () => (
  <QueryApi
    library
    checkEmpty
    query={GET_USER_SONGS}
    resultPath="user.songs"
    children={
      songs => (
        <SongsTable
          songs={songs}
          columnsToIgnore={["trackNumber", "released"]}
        />
      )
    }
  />
)

export default LibrarySongs
