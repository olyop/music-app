import React from "react"

import { FormSubmit as bem } from "../../../globals/bem"

import "./FormSubmit.scss"

const FormSubmit = () => (
  <input
    type="submit"
    text="Submit"
    className={bem("")}
  />
)

export default FormSubmit
