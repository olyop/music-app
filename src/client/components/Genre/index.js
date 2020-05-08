import React from "react"

import Item from "../Item"
import DocLink from "../DocLink"

import { propTypes } from "./props"

const Genre = ({ genre }) => (
  <Item
    doc={genre}
    upper={<DocLink doc={genre} />}
    lower={`${genre.numOfSongs} songs`}
    className="PaddingHalf Card Elevated"
  />
)

Genre.propTypes = propTypes

export default Genre
