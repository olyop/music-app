import React, { Component } from "react"

import Loading from "../Loading"
import Icon from "../Icon"
import Song from "../Song"

import { fetchQuery, serializeDatabase } from "../../apollo/helpers"
import { Songs as bem } from "../../globals/bem"
import { isEmpty, find } from "lodash"
import { propTypes } from "./props"
import query from "./query"

import "./Songs.scss"

class Songs extends Component {
  componentDidMount() {
    fetchQuery(
      query,
      ({ data }) => {
        const { props } = this
        const { syncSongs, syncAlbums, syncArtists } = props
        const { songs, albums, artists } = serializeDatabase(data)
        const { hasReceivedSongs, hasReceivedAlbums, hasReceivedArtists } = props
        syncSongs(songs)
        syncAlbums(albums)
        syncArtists(artists)
        hasReceivedSongs()
        hasReceivedAlbums()
        hasReceivedArtists()
      }
    )
  }
  renderSongsList = () => {
    const { songs, albums, artists, hasReceived } = this.props
    if (!hasReceived.songs) {
      return <Loading/>
    } else if (isEmpty(songs)) {
      return "No Songs."
    } else {
      return (
        <table className={bem("table")}>
          <thead className={bem("tableHead")}>
            <tr className={bem("tableHeadRow")}>
              <th className={bem("tableHeadCol", "tableHeadCover")}>
                <Icon
                  bem={bem}
                  icon="album"
                  className="tableHeadIcon"
                />
              </th>
              <th className={bem("tableHeadCol")}>Title</th>
              <th className={bem("tableHeadCol")}>Artist</th>
              <th className={bem("tableHeadCol")}>Album</th>
            </tr>
          </thead>
          <tbody className={bem("tableBody")}>
            {songs.map(song => {
              const { albumKey, artistKey } = song
              const album = find(albums, { key: albumKey }) || { key: "loading", title: "Loading..." }
              const artist = find(artists, { key: artistKey }) || { key: "loading", name: "Loading..." }
              return (
                <Song
                  {...song}
                  albumKey={album.key}
                  albumName={album.title}
                  artistName={artist.name}
                />
              )
            })}
          </tbody>
        </table>
      )
    }
  }
  render() {
    const { renderSongsList } = this
    return (
      <div className={bem("")}>
        {renderSongsList()}
      </div>
    )
  }
}

Songs.propTypes = propTypes

export default Songs
