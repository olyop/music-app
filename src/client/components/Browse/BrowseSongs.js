import React from "react"

import QueryApi from "../QueryApi"
import SongItem from "../SongItem"

import GET_SONGS from "../../graphql/queries/getSongs.gql"

const BrowseSongs = () => (
  <QueryApi
    query={GET_SONGS}
    resultPath="songs"
    children={
      songs => (
        <div className="Elevated">
          {songs.map(
            song => (
              <SongItem
                song={song}
                showDuration
                key={song.songId}
              />
            ),
          )}
        </div>
      )
    }
  />
)

export default BrowseSongs
