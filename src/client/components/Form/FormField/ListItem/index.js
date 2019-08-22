import React from "react"

import { ListItem as bem } from "../../../../globals/bem"
import { string, shape } from "prop-types"

import "./index.scss"

const ListItem = ({ item }) => {
  const { id, name } = item
  return (
    <p
      id={id}
      children={name}
      className={bem("")}
    />
  )
}

ListItem.propTypes = {
  item: shape({
    id: string.isRequired,
    name: string.isRequired
  }).isRequired
}

export default ListItem
