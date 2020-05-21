import React from "react"

import reactBem from "@oly_op/react-bem"
import { string, func } from "prop-types"

import "./index.scss"

const bem = reactBem("AddInput")

const AddInput = ({ val, placeholder, handleChange, className }) => (
  <input
    type="text"
    value={val}
    autoCorrect="off"
    spellCheck="false"
    autoComplete="off"
    onChange={handleChange}
    placeholder={placeholder}
    className={bem(className, "")}
  />
)

AddInput.propTypes = {
  className: string,
  placeholder: string,
  val: string.isRequired,
  handleChange: func.isRequired,
}

AddInput.defaultProps = {
  className: null,
  placeholder: null,
}

export default AddInput
