import React from "react"

import Icon from "../../../Icon"

import { Validator as bem } from "../../../../globals/bem"
import { func, string, oneOfType, node, object } from "prop-types"

import "./index.scss"

const Validator = ({ id, validator, message, value }) => {
  const isValid = validator(value)
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
  id: string.isRequired,
  validator: func.isRequired,
  message: string.isRequired,
  value: oneOfType([ node, object ]).isRequired,
}

export default Validator
