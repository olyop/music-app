import React from "react"

import { toNumber } from "lodash"
import reactBem from "@oly_op/react-bem"
import { string, func, oneOf, oneOfType, number, object } from "prop-types"

import "./index.scss"

const bem = reactBem("AddInput")

const determineWidth = (val, type) =>
  (val.length === 0 ? 1 : (
    (type === "text" ? val.length : (
      val < 10 ? 1 : 2))))

const AddInput = ({ val, style, type, placeholder, handleChange, className }) => {
  const onChange = event => {
    const { value } = event.target
    handleChange(type === "number" ? toNumber(value) : value)
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
      style={{
        ...style,
        width: `${determineWidth(val, type)}ch`,
      }}
    />
  )
}

AddInput.propTypes = {
  style: object,
  className: string,
  placeholder: string,
  handleChange: func.isRequired,
  type: oneOf(["text", "number"]),
  val: oneOfType([string, number]).isRequired,
}

AddInput.defaultProps = {
  style: {},
  type: "text",
  className: null,
  placeholder: null,
}

export default AddInput
