import React from "react"

import Links from "../Links"

import { string, arrayOf, object } from "prop-types"
import reactBEM from "@oly_op/react-bem"

import "./Album.scss"

const bem = reactBEM("Album")

const Album = ({ id, title, albumUrl, artists }) => (
  <div id={id} className={bem("")}>
    <img
      src={albumUrl}
      alt="albumCover"
      className={bem("cover")}
    />
    <div className={bem("info")}>
      <p className={bem("title")}>{title}</p>
      <p className={bem("artistName")}>
        <Links
          path="/artist"
          links={artists}
        />
      </p>
    </div>
  </div>
)

Album.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  albumUrl: string.isRequired,
  artists: arrayOf(object).isRequired
}

export default Album
