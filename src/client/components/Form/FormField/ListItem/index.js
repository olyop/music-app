import React from "react"

import { ListItem as bem } from "../../../../globals/bem"
import { string } from "prop-types"

import "./index.scss"

const ListItem = ({ id, name }) => (
  <p
    id={id}
    children={name}
    className={bem("")}
  />
)

ListItem.propTypes = {
  id: string.isRequired,
  name: string.isRequired
}

export default ListItem
