import React from "react"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"
import { isFormValid } from "../helpers"

import "./FormSubmit.scss"

const bem = reactBem("FormSubmit")

const FormSubmit = ({ form, fields, text }) => (
  <input
    text={text}
    type="submit"
    className={bem("")}
    disabled={!isFormValid(fields,form)}
  />
)

FormSubmit.propTypes = propTypes

export default FormSubmit
