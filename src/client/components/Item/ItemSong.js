import React from "react"

import Item from "./Item"
import DocLinks from "../DocLinks"
import SongTitle from "../SongTitle"

import { object, bool, string } from "prop-types"
import { deserializeDuration } from "../../helpers"

const ItemSong = ({ song, showPlay, showCover, showRight, className }) => (
  <Item
    doc={song}
    key={song.albumId}
    showPlay={showPlay}
    className={className}
    upper={<SongTitle song={song} />}
    imgDoc={showCover ? song.album : null}
    lower={<DocLinks docs={song.artists} ampersand />}
    right={showRight && deserializeDuration(song.duration)}
  />
)

ItemSong.propTypes = {
  showPlay: bool,
  showCover: bool,
  showRight: bool,
  className: string,
  song: object.isRequired,
}

ItemSong.defaultProps = {
  showPlay: true,
  showCover: true,
  showRight: true,
  className: null,
}

export default ItemSong
