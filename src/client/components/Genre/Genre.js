import React from "react"

import reactBEM from "@oly_op/react-bem"
import { string } from "prop-types"

import "./Genre.scss"

const bem = reactBEM("Genre")

const Genre = ({ id, name }) => (
  <div id={id} className={bem("")}>
    <div className={bem("info")}>
      <h2 className={bem("name")}>{name}</h2>
    </div>
  </div>
)

Genre.propTypes = {
  id: string.isRequired,
  name: string.isRequired
}

export default Genre
