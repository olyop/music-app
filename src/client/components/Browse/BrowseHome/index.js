import React from "react"

import Album from "../../Album"
import QueryApi from "../../QueryApi"
import { ItemSong } from "../../Item"

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
            <div className={bem("newAlbums-albums", "Grid")}>
              {newAlbums.map(
                album => (
                  <Album
                    key={album.id}
                    album={album}
                  />
                ),
              )}
            </div>
          </div>
          <div className={bem("topTen")}>
            <h2 className={bem("heading")}>Top 10</h2>
            {topTenSongs.map(song => <ItemSong song={song} />)}
          </div>
        </div>
      )
    }
  />
)

export default BrowseHome
