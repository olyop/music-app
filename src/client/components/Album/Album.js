import React from "react"

import ArtistsLinks from "../ArtistsLinks"

import { string, arrayOf, object } from "prop-types"
import reactBEM from "@oly_op/react-bem"

import "./Album.scss"

const bem = reactBEM("Album")

const Album = ({ id, title, albumUrl, artists }) => (
  <div id={id} className={bem("")}>
    <img
      src={albumUrl}
      alt="albumCover"
      className={bem("cover")}
    />
    <div className={bem("info")}>
      <h2 className={bem("title")}>{title}</h2>
      <h3 className={bem("artistName")}>
        <ArtistsLinks artists={artists} />
      </h3>
    </div>
  </div>
)

Album.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  albumUrl: string.isRequired,
  artists: arrayOf(object).isRequired
}

export default Album
