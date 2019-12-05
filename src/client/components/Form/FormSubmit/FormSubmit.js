import React from "react"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./FormSubmit.scss"

const bem = reactBem("FormSubmit")

const FormSubmit = ({ text, isFormValid }) => (
  <input
    text={text}
    type="submit"
    className={bem("")}
    disabled={!isFormValid}
  />
)

FormSubmit.propTypes = propTypes

export default FormSubmit
