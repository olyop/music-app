import React from "react"

import Song from "../Song"
import PlayButton from "../PlayButton"

import reactBem from "@oly_op/react-bem"
import { propTypes, defaultProps } from "./props"
import { deserializeDuration } from "../../helpers"

import "./index.scss"

const bem = reactBem("SongItem")

const SongItem = ({ song, showCover, showDuration, showTrackNumber }) => (
  <div className={bem("", "Hover", "ItemBorder")}>
    {showTrackNumber ? (
      <p
        children={song.trackNumber}
        className={bem("num", "text")}
      />
    ) : null}
    <PlayButton
      doc={song}
      className={bem("play")}
    />
    <Song
      song={song}
      key={song.songId}
      showCover={showCover}
      className={bem("song")}
      imgClassName={bem("img")}
      infoClassName={bem("info")}
    />
    {showDuration ? (
      <p
        className={bem("duration", "text")}
        children={deserializeDuration(song.duration)}
      />
    ) : null}
  </div>
)

SongItem.propTypes = propTypes
SongItem.defaultProps = defaultProps

export default SongItem
