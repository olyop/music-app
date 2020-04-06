import React from "react"

import QueryApi from "../../QueryApi"
import SongsTable from "../../SongsTable"

import { orderBy } from "lodash"

import GET_SONGS from "../../../graphql/queries/getSongs.graphql"

const BrowseSongs = () => (
  <QueryApi
    query={GET_SONGS}
    resultPath="songs"
    children={
      songs => (
        <SongsTable
          songs={orderBy(songs, "title", "asc")}
          orderByInit={{ field: "title", order: true }}
          columnsToIgnore={["trackNumber", "numOfPlays", "released", "dateCreated"]}
        />
      )
    }
  />
)

export default BrowseSongs
