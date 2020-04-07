import React from "react"

import Song from "../../Song"
import QueryApi from "../../QueryApi"

import GET_BROWSE from "../../../graphql/queries/getBrowse.graphql"

const BrowseHome = () => (
  <QueryApi
    library={false}
    query={GET_BROWSE}
    resultPath="browse.topTen"
    children={
      topTen => (
        <div>
          {topTen.map(song => <Song key={song.id} song={song} />)}
        </div>
      )
    }
  />
)

export default BrowseHome
