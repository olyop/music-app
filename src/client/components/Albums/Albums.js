import React, { Component } from "react"

import Loading from "../Loading"
import Album from "../Album"

import { fetchQuery, serializeDatabase } from "../../apollo/helpers"
import { Albums as bem } from "../../globals/bem"
import { isEmpty, find } from "lodash"
import { propTypes } from "./props"
import query from "./query"

import "./Albums.scss"

class Albums extends Component {
  componentDidMount() {
    fetchQuery(
      query,
      ({ data }) => {
        const { props } = this
        const { syncAlbums, syncArtists } = props
        const { hasReceivedAlbums, hasReceivedArtists } = props
        const { albums, artists } = serializeDatabase(data)
        syncAlbums(albums)
        syncArtists(artists)
        hasReceivedAlbums()
        hasReceivedArtists()
      }
    )
  }
  renderAlbumsList = () => {
    const { albums, artists, hasReceived } = this.props
    if (!hasReceived.albums) {
      return <Loading/>
    } else if (isEmpty(albums)) {
      return "No Albums."
    } else {
      return albums.map(album => {
        const { artistKey } = album
        const artist = find(artists, { key: artistKey }) || { name: "Loading..." }
        return (
          <Album
            {...album}
            albumKey={album.key}
            artistName={artist.name}
          />
        )
      })
    }
  }
  render() {
    const { renderAlbumsList } = this
    return (
      <div className={bem("")}>
        {renderAlbumsList()}
      </div>
    )
  }
}

Albums.propTypes = propTypes

export default Albums
