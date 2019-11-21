import React from "react"

import Icon from "../../Icon"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./FormValidator.scss"

const bem = reactBem("FormValidator")

const FormValidator = ({ validator, val }) => {
  const { id, check, msg } = validator
  const isValid = check(val)
  return (
    <div id={id} className={bem("")}>
      <Icon
        icon={isValid ? "done" : "close"}
        className={bem(isValid ? "icon-success" : "icon-failure", "icon")}
      />
      <p
        children={msg}
        className={bem("text")}
      />
    </div>
  )
}

FormValidator.propTypes = propTypes

export default FormValidator
