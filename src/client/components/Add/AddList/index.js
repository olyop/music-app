import React from "react"

import Icon from "../../Icon"
import AddItem from "../AddItem"

import reactBem from "@oly_op/react-bem"
import { uniqueId, isEmpty } from "lodash"
import { arrayOf, string, object, func } from "prop-types"

import "./index.scss"

const bem = reactBem("AddList")

const AddList = ({ val, className, handleChange }) => {
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
        <Icon
          icon="add"
          onClick={handleAdd}
          className={bem("add")}
          style={{ display: isEmpty(val.val) ? "block" : null }}
        />
      </div>
    </div>
  )
}

AddList.propTypes = {
  className: string,
  handleChange: func.isRequired,
  val: arrayOf(object).isRequired,
}

AddList.defaultProps = {
  className: null,
}

export default AddList
