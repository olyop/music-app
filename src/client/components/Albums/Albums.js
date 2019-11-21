import React from "react"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./Albums.scss"

const bem = reactBem("Albums")

const Albums = ({ children }) => (
  <div className={bem("")}>
    {children}
  </div>
)

Albums.propTypes = propTypes

export default Albums
