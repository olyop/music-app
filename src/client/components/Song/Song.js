import React from "react"

import FeaturingArtists from "../FeaturingArtists"
import { NavLink } from "react-router-dom"
import Links from "../Links"
import Icon from "../Icon"

import { string, shape, arrayOf, object, number } from "prop-types"
import { deserializeDate } from "../../helpers/misc"
import reactBEM from "@oly_op/react-bem"
import { noop, isEmpty } from "lodash"

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
      <Icon
        bem={bem}
        onClick={noop}
        icon="play_arrow"
        className="playIcon"
      />
    </td>
    <td className={bem("tableCol")}>
      <div className={bem("tableColSpan")}>
        <NavLink
          children={title}
          to={`/song/${id}`}
          className={bem("link")}
        />
        <span className={bem("mix")}>{isEmpty(mix) ? "" : ` ${mix}`}</span>
      </div>
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
        children={album.title}
        to={`/album/${album.id}`}
        className={bem("tableColSpan", "link")}
      />
      {isEmpty(album.remixers) ? null : <>
        <span> (</span>
        <span>
          <Links
            path="/artist"
            links={album.remixers}
          />
        </span>
        <span> Remix)</span>
      </>}
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
