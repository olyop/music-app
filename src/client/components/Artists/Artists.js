import React, { Component } from "react"

import Loading from "../Loading"
import Artist from "../Artist"

import { fetchQuery, serializeCollection } from "../../apollo/helpers"
import { Artists as bem } from "../../globals/bem"
import { propTypes } from "./props"
import { isEmpty } from "lodash"
import query from "./query"

import "./Artists.scss"

class Artists extends Component {
  componentDidMount() {
    fetchQuery(
      query,
      ({ data }) => {
        const { props } = this
        const { syncArtists } = props
        const { hasReceivedArtists } = props
        const artists = serializeCollection(data.artists)
        syncArtists(artists)
        hasReceivedArtists()
      }
    )
  }
  renderArtistsList = () => {
    const { artists, hasReceived } = this.props
    if (!hasReceived.artists) {
      return <Loading/>
    } else if (isEmpty(artists)) {
      return "No Artists."
    } else {
      return artists.map(artist => (
        <Artist
          {...artist}
          artistKey={artist.key}
        />
      ))
    }
  }
  render() {
    const { renderArtistsList } = this
    return (
      <div className={bem("")}>
        {renderArtistsList()}
      </div>
    )
  }
}

Artists.propTypes = propTypes

export default Artists
