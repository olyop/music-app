import React from "react"

import FeaturingArtists from "../FeaturingArtists"
import { NavLink } from "react-router-dom"
import Links from "../Links"

import { string, shape, arrayOf, object, number } from "prop-types"
import { deserializeDate } from "../../helpers/misc"
import reactBEM from "@oly_op/react-bem"
import { isEmpty } from "lodash"

import "./Song.scss"

const bem = reactBEM("Song")

const Song = ({
  id, mix, title, albumUrl, album, artists, featuring, remixers, released, genres
}) => (
  <tr id={id} className={bem("")}>
    <td className={bem("tableCol","tableHeadCover")}>
      <img
        src={albumUrl}
        alt="albumCover"
        className={bem("albumCover")}
      />
    </td>
    <td className={bem("tableCol")}>
      <span className={bem("tableColSpan")}>{`${title}${isEmpty(mix) ? "" : ` (${mix})`}`}</span>
    </td>
    <td className={bem("tableCol")}>
      <span className={bem("tableColSpan")}>
        <FeaturingArtists
          artists={artists}
          featuring={featuring}
        />
      </span>
    </td>
    <td className={bem("tableCol")}>
      <span className={bem("tableColSpan")}>
        {isEmpty(remixers) ? null : (
          <Links
            path="/artist"
            links={remixers}
          />
        )}
      </span>
    </td>
    <td className={bem("tableCol")}>
      <NavLink
        to={`/album/${album.id}`}
        children={album.title}
        className={bem("tableColSpan", "albumLink")}
      />
    </td>
    <td className={bem("tableCol")}>
      <span className={bem("tableColSpan")}>
        <Links
          path="/genre"
          links={genres}
        />
      </span>
    </td>
    <td className={bem("tableCol")}>
      <span className={bem("tableColSpan")}>{deserializeDate(released)}</span>
    </td>
  </tr>
)

Song.propTypes = {
  id: string.isRequired,
  mix: string.isRequired,
  title: string.isRequired,
  album: shape({
    id: string.isRequired,
    title: string.isRequired
  }).isRequired,
  genres: arrayOf(object),
  remixers: arrayOf(object),
  featuring: arrayOf(object),
  released: number.isRequired,
  albumUrl: string.isRequired,
  artists: arrayOf(object).isRequired
}

Song.defaultProps = {
  featuring: [],
  remixers: [],
  genres: []
}

export default Song
