import React, { useContext } from "react"

import Item from "../Item"
import DocLink from "../DocLink"
import ListStyleContext from "../../contexts/ListStyle"

import { propTypes } from "./props"
import { determinePlural } from "../../helpers"

const genreLower = ({ numOfSongs }) => (
  numOfSongs ? `
    ${numOfSongs ? `${numOfSongs} song${determinePlural(numOfSongs)}` : ""}
  ` : null
)

const Genre = ({ genre }) => {
  const { listStyle } = useContext(ListStyleContext)
  const classNames = listStyle === "grid" ?
    ["Card", "Elevated"] : ["ItemBorder", "Hover"]
  return (
    <Item
      doc={genre}
      lower={genreLower(genre)}
      upper={<DocLink doc={genre} />}
      className={classNames.concat("PaddingHalf").join(" ")}
    />
  )
}

Genre.propTypes = propTypes

export default Genre
