import React from "react"

import reactBEM from "@oly_op/react-bem"
import { node } from "prop-types"

import "./Genres.scss"

const bem = reactBEM("Genres")

const Genres = ({ children }) => (
  <div className={bem("")}>
    {children}
  </div>
)

Genres.propTypes = {
  children: node.isRequired
}

export default Genres
