import React from "react"

import reactBem from "@oly_op/react-bem"
import { propTypes } from "./props"

import "./Artists.scss"

const bem = reactBem("Artists")

const Artists = ({ children }) => (
  <div className={bem("")}>
    {children}
  </div>
)

Artists.propTypes = propTypes

export default Artists
