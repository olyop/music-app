import React from "react"

import AddLabel from "../AddLabel"
import AddValid from "../AddValid"
import AddInput from "../AddInput"

import reactBem from "@oly_op/react-bem"
import { func, string, bool } from "prop-types"

import "./index.scss"

const bem = reactBem("AddText")

const AddText = ({
  val,
  name,
  validator,
  hideLabel,
  className,
  placeholder,
  handleChange,
  inputClassName,
}) => {
  const isValid = validator(val)
  return (
    <label className={bem(className, "")}>
      {hideLabel ? null : (
        <AddLabel className={bem("text")}>
          {name}
        </AddLabel>
      )}
      <div className={bem("main")}>
        <AddInput
          val={val}
          placeholder={placeholder}
          className={inputClassName}
          handleChange={handleChange}
        />
        <AddValid
          isValid={isValid}
          className={bem("main-icon")}
        />
      </div>
    </label>
  )
}

AddText.propTypes = {
  name: string,
  hideLabel: bool,
  className: string,
  placeholder: string,
  val: string.isRequired,
  inputClassName: string,
  validator: func.isRequired,
  handleChange: func.isRequired,
}

AddText.defaultProps = {
  name: null,
  className: null,
  hideLabel: false,
  placeholder: null,
  inputClassName: null,
}

export default AddText
