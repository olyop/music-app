import React from "react"

import DocLink from "../DocLink"
import InLibraryButton from "../InLibraryButton"

import { propTypes } from "./props"
import reactBem from "@oly_op/react-bem"

import "./index.scss"

const bem = reactBem("Genre")

const Genre = ({ genre }) => (
  <div className={bem("")}>
    <h2 className={bem("name")}>
      <DocLink
        doc={genre}
        path="/genre"
      />
    </h2>
    <InLibraryButton
      doc={genre}
      className={bem("add")}
    />
  </div>
)

Genre.propTypes = propTypes

export default Genre
