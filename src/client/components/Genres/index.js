import React, { useContext } from "react"

import Genre from "../Genre"
import { ItemGenre } from "../Item"
import ListStyleContext from "../../contexts/ListStyle"

import { arrayOf, object } from "prop-types"

const Genres = ({ genres }) => {
  const { listStyle } = useContext(ListStyleContext)
  return listStyle === "grid" ? (
    <div className="Grid">
      {genres.map(
        genre => (
          <Genre
            genre={genre}
            key={genre.genreId}
          />
        ),
      )}
    </div>
  ) : (
    <div className="Elevated">
      {genres.map(
        genre => (
          <ItemGenre
            genre={genre}
            key={genre.genreId}
            className="PaddingHalf Hover ItemBorder"
          />
        ),
      )}
    </div>
  )
}

Genres.propTypes = {
  genres: arrayOf(object).isRequired,
}

export default Genres
