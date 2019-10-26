import React from "react"

import { NavLink } from "react-router-dom"

import reactBEM from "@oly_op/react-bem"
import { arrayOf, object } from "prop-types"

import "./ArtistsLinks.scss"

const bem = reactBEM("ArtistsLinks")

const determineConcat = (artists, index) => {
  const numOfArtists = artists.length
  if (numOfArtists - 2 === index) {
    return " & "
  } else if (numOfArtists - 1 === index) {
    return null
  } else {
    return ", "
  }
}

const ArtistsLinks = ({ artists }) => (
  <span className={bem("")}>
    {artists.map(
      (artist, index) => (
        <span key={artist.id}>
          <NavLink
            children={artist.name}
            className={bem("link")}
            to={`/artist/${artist.id}`}
          />
          {determineConcat(artists, index)}
        </span>
      )
    )}
  </span>
)

ArtistsLinks.propTypes = {
  artists: arrayOf(object).isRequired
}

export default ArtistsLinks
