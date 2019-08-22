import React from "react"

import Icon from "../../../Icon"

import { shape, string, func, oneOfType, node, object, } from "prop-types"
import { Validator as bem } from "../../../../globals/bem"

import "./index.scss"

const Validator = ({ validator, val }) => {
  const { id, check, message } = validator
  const isValid = check(val)
  return (
    <div id={id} className={bem("")}>
      <Icon
        bem={bem}
        icon={isValid ? "done" : "close"}
        className={isValid ? "iconSuccess" : "iconFailure"}
      />
      <p
        children={message}
        className={bem("text")}
      />
    </div>
  )
}

Validator.propTypes = {
  validator: shape({
    id: string.isRequired,
    check: func.isRequired,
    message: string.isRequired,
  }).isRequired,
  val: oneOfType([ node, object ]).isRequired,
}

export default Validator
