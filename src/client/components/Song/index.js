import React from "react"

import { Song as bem } from "../../globals/bem"
import { string } from "prop-types"

import "./index.scss"

const Song = ({ id, title, albumUrl, albumTitle, artist }) => (
  <tr id={id} className={bem("")}>
    <td className={bem("tableCol", "tableHeadCover")}>
      <img
        src={albumUrl}
        alt="albumCover"
        className={bem("albumCover")}
      />
    </td>
    <td className={bem("tableCol")}>
      <span className={bem("tableColSpan")}>{title}</span>
    </td>
    <td className={bem("tableCol")}>
      <span className={bem("tableColSpan")}>{albumTitle}</span>
    </td>
    <td className={bem("tableCol")}>
      <span className={bem("tableColSpan")}>{artist}</span>
    </td>
  </tr>
)

Song.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  albumUrl: string.isRequired,
  albumTitle: string.isRequired,
  artist: string.isRequired
}

export default Song
