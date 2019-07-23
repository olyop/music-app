import React from "react"

import { Album as bem } from "../../globals/bem"
import { propTypes } from "./props"

import "./Album.scss"

const Album = ({ albumKey, title, artistName }) => (
  <div className={bem("")}>
    <img
      alt="albumCover"
      className={bem("cover")}
      src={`/images/catalog/albumCovers/${albumKey}.jpg`}
    />
    <div className={bem("info")}>
      <h2 className={bem("title")}>{title}</h2>
      <h3 className={bem("artistName")}>{artistName}</h3>
    </div>
  </div>
)

Album.propTypes = propTypes

export default Album
