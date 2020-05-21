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
  handleChange,
  textClassName,
}) => {
  const isValid = validator(val)
  const onChange = event => {
    const { value } = event.target
    handleChange(value)
  }
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
          handleChange={onChange}
          className={textClassName}
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
  textClassName: string,
  val: string.isRequired,
  validator: func.isRequired,
  handleChange: func.isRequired,
}

AddText.defaultProps = {
  name: null,
  className: null,
  hideLabel: false,
  textClassName: null,
}

export default AddText
