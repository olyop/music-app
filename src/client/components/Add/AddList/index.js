import React from "react"

import AddItem from "../AddItem"
import IconText from "../../IconText"

import { uniqueId } from "lodash"
import reactBem from "@oly_op/react-bem"
import { arrayOf, string, object, func } from "prop-types"

import "./index.scss"

const bem = reactBem("AddList")

const AddList = ({ val, addText, className, addClassName, handleChange }) => {
  const handleAdd = () =>
    handleChange(val.concat({ id: uniqueId(), val: "" }))
  const handleRemove = ({ id }) => () =>
    handleChange(val.filter(item => item.id !== id))
  const handleInput = ({ id }) => value =>
    handleChange(val.map(item => (item.id === id ? { id, val: value } : item)))
  return (
    <div className={bem(className, "")}>
      <div className={bem("inner")}>
        {val.map(
          item => (
            <AddItem
              key={item.id}
              val={item.val}
              className={bem("item")}
              handleInput={handleInput(item)}
              handleRemove={handleRemove(item)}
            />
          ),
        )}
        <IconText
          icon="add"
          text={addText}
          onClick={handleAdd}
          iconClassName={bem("add-icon")}
          textClassName={bem("add-text")}
          className={bem(addClassName, "add")}
        />
      </div>
    </div>
  )
}

AddList.propTypes = {
  className: string,
  addClassName: string,
  addText: string.isRequired,
  handleChange: func.isRequired,
  val: arrayOf(object).isRequired,
}

AddList.defaultProps = {
  className: null,
  addClassName: null,
}

export default AddList
