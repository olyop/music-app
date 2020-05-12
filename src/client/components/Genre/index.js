import React, { useContext } from "react"

import Item from "../Item"
import DocLink from "../DocLink"
import ListStyleContext from "../../contexts/ListStyle"

import { propTypes } from "./props"

const Genre = ({ genre }) => {
  const { listStyle } = useContext(ListStyleContext)
  const classNames = listStyle === "grid" ?
    ["Card", "Elevated"] : ["ItemBorder", "Hover"]
  return (
    <Item
      doc={genre}
      upper={<DocLink doc={genre} />}
      className={classNames.concat("PaddingHalf").join(" ")}
      lower={genre.numOfSongs ? `${genre.numOfSongs} songs` : null}
    />
  )
}

Genre.propTypes = propTypes

export default Genre
