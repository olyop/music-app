import React from "react"

import Icon from "../../Icon"

import { string, shape, func } from "prop-types"
import reactBEM from "@oly_op/react-bem"

import "./FormItem.scss"

const bem = reactBEM("FormItem")

const FormItem = ({ item, onItemRemove }) => {
  const { id, name } = item
  return (
    <div id={id} className={bem("")}>
      <img
        alt="foo"
        src="/test.jpg"
        className={bem("img")}
      />
      <p
        children={name}
        className={bem("text")}
      />
      <Icon
        bem={bem}
        icon="close"
        className="close"
        onClick={onItemRemove}
      />
    </div>
  )
}

FormItem.propTypes = {
  item: shape({
    id: string.isRequired,
    name: string.isRequired
  }).isRequired,
  onItemRemove: func.isRequired
}

export default FormItem