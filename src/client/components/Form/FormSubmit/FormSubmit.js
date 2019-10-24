import React from "react"

import reactBEM from "@oly_op/react-bem"

import "./FormSubmit.scss"

const bem = reactBEM("FormSubmit")

const FormSubmit = () => (
  <input
    type="submit"
    text="Submit"
    className={bem("")}
  />
)

export default FormSubmit
