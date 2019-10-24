import React from "react"

import { FormFields as bem } from "../../../globals/bem"
import { node } from "prop-types"

import "./FormFields.scss"

const FormFields = ({ children }) => (
  <div className={bem("")}>
    {children}
  </div>
)

FormFields.propTypes = {
  children: node.isRequired
}

export default FormFields
