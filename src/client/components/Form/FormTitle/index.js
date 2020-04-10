import React from "react"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("FormTitle")

const FormTitle = ({ children }) => (
  <h2
    children={children}
    className={bem("")}
  />
)

FormTitle.propTypes = propTypes

export default FormTitle
