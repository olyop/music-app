import React from "react"

import DocLink from "../DocLink"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("Playlist")

const Playlist = ({ playlist }) => (
  <div className={bem("")}>
    <div className={bem("info")}>
      <DocLink doc={playlist} />
    </div>
  </div>
)

Playlist.propTypes = propTypes

export default Playlist
