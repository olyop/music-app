import React, { useContext } from "react"

import Album from "../Album"
import { ItemAlbum } from "../Item"
import ListStyleContext from "../../contexts/ListStyle"

import reactBem from "@oly_op/react-bem"
import { arrayOf, object, string } from "prop-types"

const bem = reactBem("Albums")

const Albums = ({ albums, className }) => {
  const { listStyle } = useContext(ListStyleContext)
  return (
    <div className={bem(className, listStyle === "grid" ? "Grid" : "Elevated")}>
      {albums.map(
        album => (listStyle === "grid" ? (
          <Album
            album={album}
            key={album.albumId}
          />
        ) : (
          <ItemAlbum
            album={album}
            key={album.albumId}
            className="PaddingHalf Hover ItemBorder"
          />
        )),
      )}
    </div>
  )
}

Albums.propTypes = {
  className: string,
  albums: arrayOf(object).isRequired,
}

Albums.defaultProps = {
  className: null,
}

export default Albums
