import React from "react"

import DocLink from "../DocLink"

import { string, shape } from "prop-types"
import reactBem from "@oly_op/react-bem"

import "./Genre.scss"

const bem = reactBem("Genre")

const Genre = ({ genre }) => {
  return (
    <div className={bem("")}>
      <h2 className={bem("name")}>
        <DocLink
          doc={genre}
          path="/genre"
        />
      </h2>
    </div>
  )
}

Genre.propTypes = {
  genre: shape({
    id: string.isRequired,
    name: string.isRequired
  }).isRequired
}

export default Genre
