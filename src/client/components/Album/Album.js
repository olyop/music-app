import React from "react"

import { NavLink } from "react-router-dom"
import AlbumTitle from "../AlbumTitle"
import DocLinks from "../DocLinks"

import { string, arrayOf, object } from "prop-types"
import reactBEM from "@oly_op/react-bem"

import "./Album.scss"

const bem = reactBEM("Album")

const Album = ({ id, title, albumUrl, artists, remixers }) => (
  <div id={id} className={bem("")}>
    <NavLink to={`/album/${id}`}>
      <img
        src={albumUrl}
        alt="albumCover"
        className={bem("cover")}
      />
    </NavLink>
    <div className={bem("info")}>
      <p className={bem("title")}>
        <AlbumTitle
          id={id}
          title={title}
          remixers={remixers}
        />
      </p>
      <p className={bem("artistName")}>
        <DocLinks
          path="/artist"
          keyName="name"
          docs={artists}
        />
      </p>
    </div>
  </div>
)

Album.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  albumUrl: string.isRequired,
  artists: arrayOf(object).isRequired,
  remixers: arrayOf(object).isRequired
}

export default Album
