import React from "react"

import { Artists as bem } from "../../globals/bem"
import { node } from "prop-types"

import "./index.scss"

const Artists = ({ children }) => (
  <div className={bem("")}>
    {children}
  </div>
)

Artists.propTypes = {
  children: node.isRequired
}

export default Artists
