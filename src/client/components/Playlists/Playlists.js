import React from "react"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./Playlists.scss"

const bem = reactBem("Playlists")

const Playlists = ({ children }) => (
  <div className={bem("")}>
    {children}
  </div>
)

Playlists.propTypes = propTypes

export default Playlists
