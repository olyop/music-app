import React from "react"

import { Genres as bem } from "../../globals/bem"
import { node } from "prop-types"

import "./Genres.scss"

const Genres = ({ children }) => (
  <div className={bem("")}>
    {children}
  </div>
)

Genres.propTypes = {
  children: node.isRequired
}

export default Genres
