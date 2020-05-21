import React from "react"

import reactBem from "@oly_op/react-bem"
import { string, node } from "prop-types"

import "./index.scss"

const bem = reactBem("AddLabel")

const AddLabel = ({ children, className }) => (
  <p className={bem(className, "")}>
    {children}
  </p>
)

AddLabel.propTypes = {
  className: string,
  children: node.isRequired,
}

AddLabel.defaultProps = {
  className: null,
}

export default AddLabel
