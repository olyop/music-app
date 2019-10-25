import React from "react"

import { NavLink } from "react-router-dom"

import reactBEM from "@oly_op/react-bem"
import { arrayOf, object } from "prop-types"

import "./ArtistsLinks.scss"

const bem = reactBEM("ArtistsLinks")

const ArtistsLinks = ({ artists }) => (
  <div className={bem("")}>
    {artists.map(
      artist => <>
        <NavLink
          key={artist.id}
          className={bem("link")}
          to={`/artist/${artist.id}`}
          children={artist.name}
        />
        {", "}
      </>
    )}
  </div>
)

ArtistsLinks.propTypes = {
  artists: arrayOf(object).isRequired
}

export default ArtistsLinks
