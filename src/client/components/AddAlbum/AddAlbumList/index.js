import React from "react"

import Icon from "../../Icon"

import reactBem from "@oly_op/react-bem"
import { arrayOf, object, string, func } from "prop-types"

import "./index.scss"

const bem = reactBem("AddAlbumList")

const AddAlbumList = ({
  val,
  objKey,
  setState,
  validator,
  className,
}) => {
  const handleChange = index => event => {
    const { value } = event.target
    setState(prevState => ({
      ...prevState,
      [objKey]: prevState[objKey].splice(index, 1, value),
    }))
  }
  const isValid = validator(val)
  return (
    <div className={bem(className, "")}>
      {val.map(
        (item, index) => (
          <div className={bem("item", "Card", "Elevated")}>
            <input
              size="auto"
              type="text"
              value={item}
              className={bem("item-input")}
              onChange={handleChange(index)}
            />
            <Icon
              icon="close"
              className={bem("icon")}
            />
          </div>
        ),
      )}
      <Icon
        className={bem("icon")}
        icon={isValid ? "done" : "close"}
        style={{ color: isValid ? "green" : "red" }}
      />
    </div>
  )
}

AddAlbumList.propTypes = {
  className: string,
  objKey: string.isRequired,
  setState: func.isRequired,
  validator: func.isRequired,
  val: arrayOf(object).isRequired,
}

AddAlbumList.defaultProps = {
  className: null,
}

export default AddAlbumList
