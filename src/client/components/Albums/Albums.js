import React from "react"

import reactBem from "@oly_op/react-bem"
import { node } from "prop-types"

import "./Albums.scss"

const bem = reactBem("Albums")

const Albums = ({ children }) => (
  <div className={bem("")}>
    {children}
  </div>
)

Albums.propTypes = {
  children: node.isRequired
}

export default Albums
