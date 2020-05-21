import React from "react"

import AddItem from "../AddItem"
import AddLabel from "../AddLabel"
import AddValid from "../AddValid"

import reactBem from "@oly_op/react-bem"
import { arrayOf, string, object, func } from "prop-types"

import "./index.scss"

const bem = reactBem("AddList")

const AddList = ({
  val,
  name,
  validator,
  className,
  handleChange,
}) => {
  const isValid = validator(val)
  return (
    <div className={bem(className, "")}>
      <AddLabel className={bem("label")}>
        {name}
      </AddLabel>
      <div className={bem("items")}>
        {val.map(
          item => (
            <div key={item.id} className={bem("item")}>
              <AddItem
                val={item.val}
                className={bem("item-content")}
                handleInput={handleChange(item)}
              />
              <AddValid
                isValid={isValid}
              />
            </div>
          ),
        )}
      </div>
    </div>
  )
}

AddList.propTypes = {
  className: string,
  name: string.isRequired,
  validator: func.isRequired,
  handleChange: func.isRequired,
  val: arrayOf(object).isRequired,
}

AddList.defaultProps = {
  className: null,
}

export default AddList
