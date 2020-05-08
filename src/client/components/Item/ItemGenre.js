import React from "react"

import Item from "./Item"
import DocLink from "../DocLink"

import { object, string } from "prop-types"

const ItemGenre = ({ genre, className }) => (
  <Item
    doc={genre}
    className={className}
    upper={<DocLink doc={genre} />}
    lower={`${genre.numOfSongs} songs`}
  />
)

ItemGenre.propTypes = {
  className: string,
  genre: object.isRequired,
}

ItemGenre.defaultProps = {
  className: null,
}

export default ItemGenre
