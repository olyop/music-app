import React from "react"

import reactBem from "@oly_op/react-bem"
import { node } from "prop-types"

import "./FormFields.scss"

const bem = reactBem("FormFields")

const FormFields = ({ children }) => (
  <div className={bem("")}>
    {children}
  </div>
)

FormFields.propTypes = {
  children: node.isRequired
}

export default FormFields
