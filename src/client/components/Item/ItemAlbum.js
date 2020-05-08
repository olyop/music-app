import React from "react"

import Item from "./Item"
import DocLink from "../DocLink"
import DocLinks from "../DocLinks"

import { object, string } from "prop-types"

const ItemAlbum = ({ album, className }) => (
  <Item
    doc={album}
    imgDoc={album}
    className={className}
    upper={<DocLink doc={album} />}
    lower={<DocLinks docs={album.artists} ampersand />}
  />
)

ItemAlbum.propTypes = {
  className: string,
  album: object.isRequired,
}

ItemAlbum.defaultProps = {
  className: null,
}

export default ItemAlbum
