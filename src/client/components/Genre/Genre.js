import React from "react"

import { Genre as bem } from "../../globals/bem"
import { string } from "prop-types"

import "./Genre.scss"

const Genre = ({ id, name }) => (
  <div id={id} className={bem("")}>
    <div className={bem("info")}>
      <h2 className={bem("name")}>{title}</h2>
    </div>
  </div>
)

Genre.propTypes = {
  id: string.isRequired,
  name: string.isRequired
}

export default Genre
