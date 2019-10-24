import React from "react"

import reactBEM from "@oly_op/react-bem"
import { node } from "prop-types"

import "./FormTitle.scss"

const bem = reactBEM("FormTitle")

const FormTitle = ({ children }) => (
  <h2 className={bem("")}>
    {children}
  </h2>
)

FormTitle.propTypes = {
  children: node.isRequired
}

export default FormTitle
