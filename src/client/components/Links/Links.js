import React from "react"

import { NavLink } from "react-router-dom"

import { arrayOf, object, string } from "prop-types"
import reactBEM from "@oly_op/react-bem"

import "./Links.scss"

const bem = reactBEM("Links")

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

const Links = ({ links, path }) => (
  <span className={bem("")}>
    {links.map(
      (link, index) => (
        <span key={link.id}>
          <NavLink
            children={link.name}
            className={bem("link")}
            to={`${path}/${link.id}`}
          />
          {determineConcat(links, index)}
        </span>
      )
    )}
  </span>
)

Links.propTypes = {
  links: arrayOf(object).isRequired,
  path: string.isRequired
}

export default Links
