import React from "react"

import Icon from "../../Icon"

import reactBem from "@oly_op/react-bem"
import { func, string } from "prop-types"

import "./index.scss"

const bem = reactBem("AddAlbumText")

const AddAlbumText = ({
  val,
  objKey,
  setState,
  validator,
  className,
  textClassName,
}) => {
  const handleChange = event => {
    const { value } = event.target
    setState(prevState => ({
      ...prevState,
      [objKey]: value,
    }))
  }
  const isValid = validator(val)
  return (
    <div className={bem(className, "")}>
      <input
        size="auto"
        type="text"
        value={val}
        onChange={handleChange}
        className={bem(textClassName, "input")}
      />
      <Icon
        className={bem("icon")}
        icon={isValid ? "done" : "close"}
        style={{ color: isValid ? "green" : "red" }}
      />
    </div>
  )
}

AddAlbumText.propTypes = {
  className: string,
  textClassName: string,
  val: string.isRequired,
  objKey: string.isRequired,
  setState: func.isRequired,
  validator: func.isRequired,
}

AddAlbumText.defaultProps = {
  className: null,
  textClassName: null,
}

export default AddAlbumText
