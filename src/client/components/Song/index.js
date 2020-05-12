import React from "react"

import Item from "../Item"
import DocLinks from "../DocLinks"
import SongTitle from "../SongTitle"

import { object, bool, string } from "prop-types"
import { deserializeDuration } from "../../helpers"

const Song = ({
  song,
  showPlay,
  showCover,
  showRight,
  className,
  addClassName,
  showTrackNumber,
}) => (
  <Item
    doc={song}
    key={song.albumId}
    showPlay={showPlay}
    className={className}
    addClassName={addClassName}
    upper={<SongTitle song={song} />}
    imgDoc={showCover ? song.album : null}
    lower={<DocLinks docs={song.artists} ampersand />}
    left={showTrackNumber ? song.trackNumber : null}
    right={showRight ? deserializeDuration(song.duration) : null}
  />
)

Song.propTypes = {
  showPlay: bool,
  showCover: bool,
  showRight: bool,
  className: string,
  addClassName: string,
  showTrackNumber: bool,
  song: object.isRequired,
}

Song.defaultProps = {
  showPlay: true,
  showCover: true,
  showRight: true,
  className: null,
  addClassName: null,
  showTrackNumber: false,
}

export default Song
