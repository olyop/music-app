import React from "react"

import AddAlbumItem from "../AddAlbumItem"
import AddAlbumLabel from "../AddAlbumLabel"
import AddAlbumValid from "../AddAlbumValid"

import reactBem from "@oly_op/react-bem"
import { arrayOf, string, object, func } from "prop-types"

import "./index.scss"

const bem = reactBem("AddAlbumList")

const AddAlbumList = ({
  val,
  name,
  validator,
  className,
  handleChange,
}) => {
  const isValid = validator(val)
  const onChange = item => event => {
    const { value } = event.target
    handleChange(item)(value)
  }
  return (
    <div className={bem(className, "")}>
      <AddAlbumLabel className={bem("label")}>
        {name}
      </AddAlbumLabel>
      <div className={bem("main")}>
        <div className={bem("items")}>
          {val.map(
            item => (
              <AddAlbumItem
                key={item.id}
                val={item.val}
                className={bem("item")}
                handleInput={onChange(item)}
              />
            ),
          )}
        </div>
        <AddAlbumValid
          isValid={isValid}
          className={bem("icon")}
        />
      </div>
    </div>
  )
}

AddAlbumList.propTypes = {
  className: string,
  name: string.isRequired,
  validator: func.isRequired,
  handleChange: func.isRequired,
  val: arrayOf(object).isRequired,
}

AddAlbumList.defaultProps = {
  className: null,
}

export default AddAlbumList
