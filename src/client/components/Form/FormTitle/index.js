import React from "react"

import { FormTitle as bem } from "../../../globals/bem"
import { node } from "prop-types"

import "./index.scss"

const FormTitle = ({ children }) => (
  <div className={bem("")}>
    {children}
  </div>
)

FormTitle.propTypes = {
  children: node.isRequired
}

export default FormTitle
