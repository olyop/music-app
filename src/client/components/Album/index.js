import React from "react"

import Item from "../Item"
import Cover from "../Cover"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"

import { propTypes } from "./props"

const Album = ({ album }) => (
  <div className="Card Elevated">
    <Cover url={album.cover} />
    <Item
      doc={album}
      className="PaddingHalf"
      upper={<DocLink doc={album} />}
      lower={<DocLinks ampersand docs={album.artists} />}
    />
  </div>
)

Album.propTypes = propTypes

export default Album
