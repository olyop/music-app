import React from "react"

import reactBem from "@oly_op/react-bem"
import { node } from "prop-types"

import "./Genres.scss"

const bem = reactBem("Genres")

const Genres = ({ children }) => (
  <div className={bem("")}>
    {children}
  </div>
)

Genres.propTypes = {
  children: node.isRequired
}

export default Genres
