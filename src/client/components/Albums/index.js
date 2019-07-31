import React from "react"

import { Albums as bem } from "../../globals/bem"
import { node } from "prop-types"

import "./index.scss"

const Albums = ({ children }) => (
  <div className={bem("")}>
    {children}
  </div>
)

Albums.propTypes = {
  children: node.isRequired
}

export default Albums
