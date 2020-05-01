import React from "react"

import QueryApi from "../QueryApi"
import SongsTable from "../SongsTable"

import GET_SONGS from "../../graphql/queries/getSongs.gql"

const BrowseSongs = () => (
  <QueryApi
    query={GET_SONGS}
    resultPath="songs"
    children={
      songs => (
        <SongsTable
          songs={songs}
          columnsToIgnore={["trackNumber", "numOfPlays", "released", "dateAdded"]}
        />
      )
    }
  />
)

export default BrowseSongs
