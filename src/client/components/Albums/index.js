import React, { useContext } from "react"

import Album from "../Album"
import { ItemAlbum } from "../Item"
import ListStyleContext from "../../contexts/ListStyle"

import { arrayOf, object } from "prop-types"

const Albums = ({ albums }) => {
  const { listStyle } = useContext(ListStyleContext)
  return listStyle === "grid" ? (
    <div className="Grid">
      {albums.map(
        album => (
          <Album
            album={album}
            key={album.albumId}
          />
        ),
      )}
    </div>
  ) : (
    <div className="Elevated">
      {albums.map(
        album => (
          <ItemAlbum
            album={album}
            key={album.albumId}
            className="PaddingHalf Hover ItemBorder"
          />
        ),
      )}
    </div>
  )
}

Albums.propTypes = {
  albums: arrayOf(object).isRequired,
}

export default Albums
