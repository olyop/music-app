import React from "react"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"

import { propTypes } from "./props"

const Artist = ({ artist }) => (
  <div className="Card Elevated">
    <Cover landscape url={artist.photo} />
    <Item
      doc={artist}
      className="PaddingHalf"
      upper={<DocLink doc={artist} />}
      lower={`${artist.numOfAlbums} albums, ${artist.numOfSongs} of songs`}
    />
  </div>
)

Artist.propTypes = propTypes

export default Artist
