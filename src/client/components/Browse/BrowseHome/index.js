import React from "react"

import List from "../../List"
import Song from "../../Song"
import Album from "../../Album"
import QueryApi from "../../QueryApi"

import reactBem from "@oly_op/react-bem"

import GET_BROWSE from "../../../graphql/queries/getBrowse.gql"

import "./index.scss"

const bem = reactBem("BrowseHome")

const BrowseHome = () => (
  <QueryApi
    query={GET_BROWSE}
    children={
      ({ newAlbums, topTenSongs }) => (
        <div className={bem("")}>
          <div className={bem("newAlbums")}>
            <h2 className={bem("heading")}>New Albums</h2>
            <List>
              {newAlbums.map(
                album => (
                  <Album
                    album={album}
                    key={album.albumId}
                  />
                ),
              )}
            </List>
          </div>
          <div className={bem("topTen")}>
            <h2 className={bem("heading")}>Top 10</h2>
            {topTenSongs.map(
              song => (
                <Song
                  song={song}
                  key={song.songId}
                />
              ),
            )}
          </div>
        </div>
      )
    }
  />
)

export default BrowseHome
