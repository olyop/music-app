import React, { useContext } from "react"

import Artist from "../Artist"
import { ItemArtist } from "../Item"
import ListStyleContext from "../../contexts/ListStyle"

import { arrayOf, object } from "prop-types"

const Artists = ({ artists }) => {
  const { listStyle } = useContext(ListStyleContext)
  return listStyle === "grid" ? (
    <div className="Grid">
      {artists.map(
        artist => (
          <Artist
            artist={artist}
            key={artist.artistId}
          />
        ),
      )}
    </div>
  ) : (
    <div className="Elevated">
      {artists.map(
        artist => (
          <ItemArtist
            artist={artist}
            key={artist.artistId}
            className="PaddingHalf Hover ItemBorder"
          />
        ),
      )}
    </div>
  )
}

Artists.propTypes = {
  artists: arrayOf(object).isRequired,
}

export default Artists
