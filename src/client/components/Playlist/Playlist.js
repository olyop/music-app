import React from "react"

import Img from "../Img"
import DocLink from "../DocLink"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"
import { catalogUrl } from "../../helpers/misc"

import "./Playlist.scss"

const bem = reactBem("Playlist")

const Playlist = ({ playlist }) => (
  <div className={bem("")}>
    <div className={bem("cover")}>
      {playlist.songs.map(({ id, album }) => (
        <Img
          key={id}
          className={bem("img")}
          url={catalogUrl(album.id)}
        />
      ))}
    </div>
    <div className={bem("info")}>
      <DocLink
        doc={playlist}
        path="/playlist"
      />
    </div>
  </div>
)

Playlist.propTypes = propTypes

export default Playlist
