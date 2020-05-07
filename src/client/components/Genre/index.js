import React from "react"

import Info from "../Info"
import DocLink from "../DocLink"

import { propTypes } from "./props"

import "./index.scss"

const Genre = ({ genre }) => (
  <Info
    doc={genre}
    addClassName="Genre__add"
    textClassName="Genre__text"
    className="Genre Card Elevated"
    lower={`${genre.numOfSongs} songs`}
    upper={<DocLink doc={genre} path="/genre" />}
  />
)

Genre.propTypes = propTypes

export default Genre
