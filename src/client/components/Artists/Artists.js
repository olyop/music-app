import React from "react"

import reactBEM from "@oly_op/react-bem"
import { node } from "prop-types"

import "./Artists.scss"

const bem = reactBEM("Artists")

const Artists = ({ children }) => (
  <div className={bem("")}>
    {children}
  </div>
)

Artists.propTypes = {
  children: node.isRequired
}

export default Artists
