import React from "react"

import ArtistsLinks from "../ArtistsLinks"

import reactBEM from "@oly_op/react-bem"
import { string, arrayOf, object } from "prop-types"

import "./Song.scss"

const bem = reactBEM("Song")

const Song = ({ id, title, albumUrl, albumTitle, artists }) => (
  <tr id={id} className={bem("")}>
    <td className={bem("tableCol","tableHeadCover")}>
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
      <span className={bem("tableColSpan")}>
        <ArtistsLinks artists={artists} />
      </span>
    </td>
    <td className={bem("tableCol")}>
      <span className={bem("tableColSpan")}>{albumTitle}</span>
    </td>
  </tr>
)

Song.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  albumUrl: string.isRequired,
  albumTitle: string.isRequired,
  artists: arrayOf(object).isRequired
}

export default Song
