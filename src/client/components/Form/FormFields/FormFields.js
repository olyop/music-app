import React from "react"

import reactBEM from "@oly_op/react-bem"
import { node } from "prop-types"

import "./FormFields.scss"

const bem = reactBEM("FormFields")

const FormFields = ({ children }) => (
  <div className={bem("")}>
    {children}
  </div>
)

FormFields.propTypes = {
  children: node.isRequired
}

export default FormFields
