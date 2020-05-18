import React from "react"

import Song from "../Song"
import QueryApi from "../QueryApi"

import { map } from "lodash/fp"

import GET_SONGS from "../../graphql/queries/getSongs.gql"

const BrowseSongs = () => (
  <QueryApi
    query={GET_SONGS}
    resultPath="songs"
    className="Elevated"
    children={map(
      song => (
        <Song
          song={song}
          key={song.songId}
          className="PaddingHalf Hover ItemBorder"
        />
      ),
    )}
  />
)

export default BrowseSongs
