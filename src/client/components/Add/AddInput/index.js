import React from "react"

import reactBem from "@oly_op/react-bem"
import { string, func, oneOf, oneOfType, number } from "prop-types"

import "./index.scss"

const bem = reactBem("AddInput")

const AddInput = ({ val, type, placeholder, handleChange, className }) => {
  const onChange = event => {
    const { value } = event.target
    handleChange(value)
  }
  return (
    <input
      type={type}
      value={val}
      autoCorrect="off"
      spellCheck="false"
      autoComplete="off"
      onChange={onChange}
      placeholder={placeholder}
      className={bem(className, "")}
    />
  )
}

AddInput.propTypes = {
  className: string,
  placeholder: string,
  handleChange: func.isRequired,
  type: oneOf(["text", "number"]),
  val: oneOfType([string, number]).isRequired,
}

AddInput.defaultProps = {
  type: "text",
  className: null,
  placeholder: null,
}

export default AddInput
