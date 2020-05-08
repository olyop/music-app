import React from "react"

import Item from "./Item"
import DocLink from "../DocLink"

import { object, string } from "prop-types"

const ItemArtist = ({ artist, className }) => (
  <Item
    doc={artist}
    imgDoc={artist}
    className={className}
    upper={<DocLink doc={artist} />}
    lower={`${artist.numOfAlbums} albums, ${artist.numOfSongs} of songs`}
  />
)

ItemArtist.propTypes = {
  className: string,
  artist: object.isRequired,
}

ItemArtist.defaultProps = {
  className: null,
}

export default ItemArtist
