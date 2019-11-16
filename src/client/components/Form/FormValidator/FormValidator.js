import React from "react"

import Icon from "../../Icon"

import { shape, string, func, oneOfType, node, object, } from "prop-types"
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
        className={bem(isValid ? "iconSuccess" : "iconFailure")}
      />
      <p
        children={msg}
        className={bem("text")}
      />
    </div>
  )
}

FormValidator.propTypes = {
  validator: shape({
    id: string.isRequired,
    check: func.isRequired,
    msg: string.isRequired,
  }).isRequired,
  val: oneOfType([ node, object ]).isRequired,
}

export default FormValidator
