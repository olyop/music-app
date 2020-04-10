import React from "react"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("FormFields")

const FormFields = ({ children }) => (
  <div className={bem("")}>
    {children}
  </div>
)

FormFields.propTypes = propTypes

export default FormFields
