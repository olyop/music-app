import React from "react"

import { Song as bem } from "../../globals/bem"
import { propTypes } from "./props"

import "./Song.scss"

const Song = ({ title, albumId, albumTitle, artistName }) => (
  <tr className={bem("")}>
    <td className={bem("tableCol", "tableHeadCover")}>
      <img
        alt="albumCover"
        className={bem("albumCover")}
        src={`/images/catalog/albumCovers/${albumId}.jpg`}
      />
    </td>
    <td className={bem("tableCol")}>
      <span className={bem("tableColSpan")}>{title}</span>
    </td>
    <td className={bem("tableCol")}>
      <span className={bem("tableColSpan")}>{albumTitle}</span>
    </td>
    <td className={bem("tableCol")}>
      <span className={bem("tableColSpan")}>{artistName}</span>
    </td>
  </tr>
)

Song.propTypes = propTypes

export default Song
