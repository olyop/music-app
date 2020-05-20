import React from "react"

import reactBem from "@oly_op/react-bem"
import { string, node } from "prop-types"

import "./index.scss"

const bem = reactBem("AddAlbumLabel")

const AddAlbumLabel = ({ children, className }) => (
  <p className={bem(className, "")}>
    {children}
  </p>
)

AddAlbumLabel.propTypes = {
  className: string,
  children: node.isRequired,
}

AddAlbumLabel.defaultProps = {
  className: null,
}

export default AddAlbumLabel
