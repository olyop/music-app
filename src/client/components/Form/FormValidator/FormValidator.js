import React from "react"

import Icon from "../../Icon"

import { shape, string, func, oneOfType, node, object, } from "prop-types"
import reactBEM from "@oly_op/react-bem"
import { noop } from "lodash"

import "./FormValidator.scss"

const bem = reactBEM("FormValidator")

const FormValidator = ({ validator, val }) => {
  const { id, check, msg } = validator
  const isValid = check(val)
  return (
    <div id={id} className={bem("")}>
      <Icon
        bem={bem}
        onClick={noop}
        icon={isValid ? "done" : "close"}
        className={isValid ? "iconSuccess" : "iconFailure"}
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