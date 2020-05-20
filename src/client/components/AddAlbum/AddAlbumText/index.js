import React from "react"

import AddAlbumLabel from "../AddAlbumLabel"
import AddAlbumValid from "../AddAlbumValid"
import AddAlbumInput from "../AddAlbumInput"

import reactBem from "@oly_op/react-bem"
import { func, string } from "prop-types"

import "./index.scss"

const bem = reactBem("AddAlbumText")

const AddAlbumText = ({
  val,
  name,
  validator,
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
      <AddAlbumLabel className={bem("text")}>
        {name}
      </AddAlbumLabel>
      <div className={bem("main")}>
        <AddAlbumInput
          val={val}
          handleChange={onChange}
          className={textClassName}
        />
        <AddAlbumValid
          isValid={isValid}
          className={bem("main-icon")}
        />
      </div>
    </label>
  )
}

AddAlbumText.propTypes = {
  className: string,
  textClassName: string,
  val: string.isRequired,
  name: string.isRequired,
  validator: func.isRequired,
  handleChange: func.isRequired,
}

AddAlbumText.defaultProps = {
  className: null,
  textClassName: null,
}

export default AddAlbumText
