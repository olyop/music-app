import React from "react"

import { Album as bem } from "../../globals/bem"
import { string } from "prop-types"

import "./index.scss"

const Album = ({ id, title, artistName }) => (
  <div className={bem("")}>
    <img
      alt="albumCover"
      className={bem("cover")}
      src={`/images/catalog/albumCovers/${id}.jpg`}
    />
    <div className={bem("info")}>
      <h2 className={bem("title")}>{title}</h2>
      <h3 className={bem("artistName")}>{artistName}</h3>
    </div>
  </div>
)

Album.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  artistName: string.isRequired
}

export default Album
