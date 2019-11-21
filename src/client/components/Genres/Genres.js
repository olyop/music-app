import React from "react"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./Genres.scss"

const bem = reactBem("Genres")

const Genres = ({ children }) => (
  <div className={bem("")}>
    {children}
  </div>
)

Genres.propTypes = propTypes

export default Genres
