import React from "react"

import reactBEM from "@oly_op/react-bem"
import { string } from "prop-types"

import "./Album.scss"

const bem = reactBEM("Album")

const Album = ({ id, title, albumUrl, artist }) => (
  <div id={id} className={bem("")}>
    <img
      src={albumUrl}
      alt="albumCover"
      className={bem("cover")}
    />
    <div className={bem("info")}>
      <h2 className={bem("title")}>{title}</h2>
      <h3 className={bem("artistName")}>{artist}</h3>
    </div>
  </div>
)

Album.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  albumUrl: string.isRequired,
  artist: string.isRequired
}

export default Album
