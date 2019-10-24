import React from "react"

import { FormTitle as bem } from "../../../globals/bem"
import { node } from "prop-types"

import "./FormTitle.scss"

const FormTitle = ({ children }) => (
  <h2 className={bem("")}>
    {children}
  </h2>
)

FormTitle.propTypes = {
  children: node.isRequired
}

export default FormTitle
