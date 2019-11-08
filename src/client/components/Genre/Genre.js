import React from "react"

import reactBEM from "@oly_op/react-bem"
import { string } from "prop-types"

import "./Genre.scss"

const bem = reactBEM("Genre")

const Genre = ({ id, name }) => (
  <div id={id} className={bem("")}>
    <h2 className={bem("name")}>
      {name}
    </h2>
  </div>
)

Genre.propTypes = {
  id: string.isRequired,
  name: string.isRequired
}

export default Genre
