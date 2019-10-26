import React from "react"

import ArtistsLinks from "../ArtistsLinks"
import { NavLink } from "react-router-dom"

import { string, arrayOf, object, number } from "prop-types"
import { deserializeDate } from "../../helpers/misc"
import reactBEM from "@oly_op/react-bem"
import { isEmpty } from "lodash"

import "./Song.scss"

const bem = reactBEM("Song")

const Song = ({ id, title, albumUrl, albumTitle, artists, featuring, remixers, released }) => (
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
        {isEmpty(featuring) ? null : <>
          <span> feat. </span>
          <ArtistsLinks artists={featuring} />
        </>}
      </span>
    </td>
    <td className={bem("tableCol")}>
      <span className={bem("tableColSpan")}>
        <ArtistsLinks artists={remixers} />
      </span>
    </td>
    <td className={bem("tableCol")}>
      <NavLink
        to={`/album/${id}`}
        children={albumTitle}
        className={bem("tableColSpan", "albumLink")}
      />
    </td>
    <td className={bem("tableCol")}>
      <span className={bem("tableColSpan")}>{deserializeDate(released)}</span>
    </td>
  </tr>
)

Song.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  remixers: arrayOf(object),
  featuring: arrayOf(object),
  released: number.isRequired,
  albumUrl: string.isRequired,
  albumTitle: string.isRequired,
  artists: arrayOf(object).isRequired
}

Song.defaultProps = {
  featuring: [],
  remixers: []
}

export default Song
