import React from "react"

import reactBem from "@oly_op/react-bem"

import "./FormSubmit.scss"

const bem = reactBem("FormSubmit")

const FormSubmit = () => (
  <input
    type="submit"
    text="Submit"
    className={bem("")}
  />
)

export default FormSubmit
