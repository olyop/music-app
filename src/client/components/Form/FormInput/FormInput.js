import React from "react"

import {
  determineMin,
  determineMax,
  determineTabIndex,
  determineInputVal,
  determineDisabled,
  determineInputType,
  determineMinLength,
  determineMaxLength,
} from "../helpers"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./FormInput.scss"

const bem = reactBem("FormInput")

const FormInput = ({ field, onFieldChange, val, index }) => {
  const { id, name } = field
  return (
    <input
      id={id}
      name={name}
      autoCorrect="off"
      autoComplete="off"
      spellCheck="false"
      className={bem("")}
      autoCapitalize="off"
      onChange={onFieldChange}
      min={determineMin(field)}
      max={determineMax(field)}
      type={determineInputType(field)}
      tabIndex={determineTabIndex(index)}
      value={determineInputVal(field,val)}
      minLength={determineMinLength(field)}
      maxLength={determineMaxLength(field)}
      disabled={determineDisabled(field,val)}
    />
  )
}

FormInput.propTypes = propTypes

export default FormInput
