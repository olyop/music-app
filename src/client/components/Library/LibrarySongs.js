import React from "react"

import QueryApi from "../QueryApi"
import SongsTable from "../SongsTable"

import { orderBy } from "lodash"

import GET_USER_SONGS from "../../graphql/queries/getUserSongs.graphql"

const LibrarySongs = () => (
  <QueryApi
    library
    query={GET_USER_SONGS}
    resultPath="user.songs"
    children={
      songs => (
        <SongsTable
          orderByInit={{ field: "title", order: true }}
          songs={orderBy(songs, "dateCreated", "desc")}
          columnsToIgnore={["trackNumber", "released"]}
        />
      )
    }
  />
)

export default LibrarySongs
