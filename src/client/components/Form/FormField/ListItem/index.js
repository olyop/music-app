import React from "react"

import Icon from "../../../Icon"

import { ListItem as bem } from "../../../../globals/bem"
import { string, shape, func } from "prop-types"

import "./index.scss"

const ListItem = ({ item, onItemRemove }) => {
  const { id, name } = item
  return (
    <div id={id} className={bem("")}>
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

ListItem.propTypes = {
  item: shape({
    id: string.isRequired,
    name: string.isRequired
  }).isRequired,
  onItemRemove: func.isRequired
}

export default ListItem
