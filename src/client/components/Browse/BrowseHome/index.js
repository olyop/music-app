import React from "react"

import Song from "../../Song"
import Grid from "../../Grid"
import Album from "../../Album"
import QueryApi from "../../QueryApi"

import reactBem from "@oly_op/react-bem"

import GET_BROWSE from "../../../graphql/queries/getBrowse.graphql"

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
            <Grid className={bem("newAlbums-albums")}>
              {newAlbums.map(
                album => (
                  <Album
                    key={album.id}
                    album={album}
                  />
                ),
              )}
            </Grid>
          </div>
          <div className={bem("topTen")}>
            <h2 className={bem("heading")}>Top 10</h2>
            {topTenSongs.map(
              (song, index) => (
                <div key={song.id} className={bem("topTen-song")}>
                  <p className={bem("topTen-song-num")}>{`${index + 1}`}</p>
                  <Song song={song} />
                </div>
              ),
            )}
          </div>
        </div>
      )
    }
  />
)

export default BrowseHome
