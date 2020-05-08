import React from "react"

import QueryApi from "../QueryApi"
import { ItemSong } from "../Item"

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
              <ItemSong
                song={song}
                key={song.songId}
                className="PaddingHalf Hover ItemBorder"
              />
            ),
          )}
        </div>
      )
    }
  />
)

export default BrowseSongs
